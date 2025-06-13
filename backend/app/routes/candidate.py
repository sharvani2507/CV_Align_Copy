from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from app.models.candidate import CandidateBase, CandidateCreate, CandidateResponse
from app.database import Database
from app.routes.auth import get_current_user
from app.models.user import User
from app.utils.mongo_utils import convert_id
from typing import List
from datetime import datetime
import cloudinary
import cloudinary.uploader
import os
import requests
import tempfile
import subprocess
import json
from dotenv import load_dotenv
import logging
from bson.objectid import ObjectId

# Load environment variables
load_dotenv()

router = APIRouter()
db = Database()

# Cloudinary config with proper error handling
cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
api_key = os.getenv("CLOUDINARY_API_KEY")
api_secret = os.getenv("CLOUDINARY_API_SECRET")

if not all([cloud_name, api_key, api_secret]):
    raise ValueError("Missing Cloudinary credentials. Please check your .env file.")

cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret
)

# --- Helper: Call AI parser (rag.py) ---
async def parse_cv_with_ai(cv_url: str, job_description: str) -> dict:
    """Parse a CV using the AI script."""
    try:
        # Download the CV from Cloudinary
        response = requests.get(cv_url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to download CV from Cloudinary")

        # Get file extension from URL
        file_ext = os.path.splitext(cv_url)[1].lower()
        if not file_ext:
            # If no extension in URL, try to determine from content type
            content_type = response.headers.get('content-type', '').lower()
            if 'pdf' in content_type:
                file_ext = '.pdf'
            elif 'msword' in content_type or 'docx' in content_type:
                file_ext = '.docx'
            else:
                raise HTTPException(status_code=400, detail="Unsupported file type")

        # Create temporary file with correct extension
        with tempfile.NamedTemporaryFile(suffix=file_ext, delete=False) as tmp:
            tmp.write(response.content)
            tmp_path = tmp.name

        try:
            # Call the AI script
            result = subprocess.run(
                ["python", "AI/rag.py", "--cv", tmp_path, "--job", job_description],
                capture_output=True,
                text=True,
                check=True
            )
            
            # Parse the output
            output = result.stdout.strip()
            if not output:
                raise ValueError("AI script returned empty output")
                
            # Parse the structured output
            parsed_result = parse_output(output)
            
            # Clean up temporary file
            os.unlink(tmp_path)
            
            return parsed_result

        except subprocess.CalledProcessError as e:
            logger.error(f"AI script failed: {e.stderr}")
            raise HTTPException(
                status_code=500,
                detail=f"AI parsing failed: {e.stderr}"
            )
        finally:
            # Ensure temporary file is cleaned up
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)

    except Exception as e:
        logger.error(f"Error parsing CV: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse CV: {str(e)}"
        )

@router.post("/candidates/upload", response_model=CandidateResponse)
async def upload_candidate_cv(
    job_role_id: str = Form(...),
    job_description: str = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "recruiter":
        raise HTTPException(status_code=403, detail="Only recruiters can upload CVs.")
    
    # Validate file type
    allowed_types = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF, DOC, and DOCX files are allowed."
        )
    
    # Upload file to Cloudinary
    try:
        # Read file content
        file_content = await file.read()
        if not file_content:
            raise HTTPException(status_code=400, detail="Empty file uploaded")
            
        # Upload to Cloudinary with specific resource type
        try:
            result = cloudinary.uploader.upload(
                file_content,
                resource_type="raw",  # Use raw for all document types
                folder="cv_uploads",
                type="upload",
                public_id=f"{file.filename.split('.')[0]}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}",
                format=file.filename.split('.')[-1].lower()  # Preserve original format
            )
            cv_url = result["secure_url"]
            logging.info(f"File uploaded successfully to Cloudinary: {cv_url}")
        except Exception as e:
            logging.error(f"Cloudinary upload failed: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to upload file to storage: {str(e)}"
            )
        
        # Get job role title
        job_role = await db.get_collection("job_roles").find_one({"_id": ObjectId(job_role_id)})
        if not job_role:
            raise HTTPException(status_code=404, detail="Job role not found")
        
        # Parse CV with AI
        try:
            ai_result = await parse_cv_with_ai(cv_url, job_description)
            logging.info(f"AI parsing result: {ai_result}")
            
            # Handle ineligible candidates
            if ai_result.get("eligibility") == "not_eligible":
                candidate_doc = {
                    "candidate_name": ai_result["candidate_name"],
                    "degree": "Not Eligible",
                    "course": "Not Eligible",
                    "cgpa": "N/A",
                    "ats_score": 0,
                    "strengths": [],
                    "weaknesses": [],
                    "feedback": f"Not eligible: {ai_result['reason']}",
                    "detailed_feedback": f"Not eligible: {ai_result['reason']}",
                    "cv_url": cv_url,
                    "recruiter_id": str(current_user.id),
                    "job_role_id": job_role_id,
                    "job_role_title": job_role["title"],
                    "status": "rejected",
                    "created_at": datetime.utcnow(),
                }
            else:
                # Handle eligible candidates
                candidate_doc = {
                    "candidate_name": ai_result["candidate_name"],
                    "degree": ai_result.get("degree", "Not specified"),
                    "course": ai_result.get("course", "Not specified"),
                    "cgpa": ai_result.get("cgpa", "Not specified"),
                    "ats_score": ai_result.get("ats_score", 0),
                    "strengths": ai_result.get("strengths", []),
                    "weaknesses": ai_result.get("weaknesses", []),
                    "feedback": ai_result.get("feedback", ""),
                    "detailed_feedback": ai_result.get("detailed_feedback", ""),
                    "cv_url": cv_url,
                    "recruiter_id": str(current_user.id),
                    "job_role_id": job_role_id,
                    "job_role_title": job_role["title"],
                    "status": "uploaded",
                    "created_at": datetime.utcnow(),
                }
        except Exception as e:
            logging.error(f"AI parsing failed: {str(e)}")
            # If AI parsing fails, store with default values
            candidate_doc = {
                "candidate_name": file.filename,
                "degree": "Pending",
                "course": "Pending",
                "cgpa": "Pending",
                "ats_score": 0,
                "strengths": [],
                "weaknesses": [],
                "feedback": "Pending AI analysis",
                "detailed_feedback": "Pending AI analysis",
                "cv_url": cv_url,
                "recruiter_id": str(current_user.id),
                "job_role_id": job_role_id,
                "job_role_title": job_role["title"],
                "status": "pending",
                "created_at": datetime.utcnow(),
            }
        
        # Store candidate in DB
        try:
            collection = db.get_collection("candidates")
            insert_result = await collection.insert_one(candidate_doc)
            candidate_doc["_id"] = insert_result.inserted_id
            
            return CandidateResponse(**convert_id(candidate_doc))
        except Exception as e:
            logging.error(f"Database operation failed: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to store candidate data: {str(e)}"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"CV upload failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload CV: {str(e)}"
        )
    finally:
        await file.close()

@router.get("/recruiter", response_model=List[CandidateResponse])
async def get_recruiter_candidates(current_user: User = Depends(get_current_user)):
    try:
        if current_user.role != "recruiter":
            raise HTTPException(status_code=403, detail="Only recruiters can view their candidates.")
        
        collection = db.get_collection("candidates")
        candidates = await collection.find({"recruiter_id": str(current_user.id)}).to_list(length=None)
        
        # Convert ObjectIds to strings and ensure all required fields are present
        processed_candidates = []
        for candidate in candidates:
            candidate_data = convert_id(candidate)
            # Ensure all required fields are present
            if "job_role_title" not in candidate_data:
                # Fetch job role title if missing
                job_role = await db.get_collection("job_roles").find_one({"_id": ObjectId(candidate_data["job_role_id"])})
                if job_role:
                    candidate_data["job_role_title"] = job_role["title"]
                else:
                    candidate_data["job_role_title"] = "Unknown Role"
            
            processed_candidates.append(candidate_data)
        
        return [CandidateResponse(**c) for c in processed_candidates]
    except Exception as e:
        logging.error(f"Error fetching recruiter candidates: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch candidates: {str(e)}"
        )

@router.get("/candidates/company", response_model=List[CandidateResponse])
async def get_company_candidates(current_user: User = Depends(get_current_user)):
    if current_user.role != "hiring_manager":
        raise HTTPException(status_code=403, detail="Only hiring managers can view all candidates.")
    # Find all job roles for this company
    job_roles = await db.get_collection("job_roles").find({"company_id": current_user.company_code}).to_list(length=None)
    job_role_ids = [str(jr["_id"]) for jr in job_roles]
    collection = db.get_collection("candidates")
    candidates = await collection.find({"job_role_id": {"$in": job_role_ids}}).to_list(length=None)
    return [CandidateResponse(**convert_id(c)) for c in candidates]

@router.get("/{candidate_id}", response_model=CandidateResponse)
async def get_candidate(candidate_id: str, current_user: User = Depends(get_current_user)):
    try:
        object_id = ObjectId(candidate_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid candidate ID")
    
    collection = db.get_collection("candidates")
    candidate = await collection.find_one({"_id": object_id})
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    # Check if user has permission to view this candidate
    if current_user.role == "recruiter" and str(candidate["recruiter_id"]) != str(current_user.id):
        raise HTTPException(status_code=403, detail="You don't have permission to view this candidate")
    
    return CandidateResponse(**convert_id(candidate)) 