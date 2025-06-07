from fastapi import APIRouter, HTTPException, Depends
from app.models.company import CompanyCreate, CompanyResponse, CompanyModel
from app.database import get_database
from app.utils.code_utils import generate_unique_code
from datetime import datetime
import logging

router = APIRouter(prefix="/company", tags=["Company"])

@router.post("/register", response_model=CompanyResponse)
async def register_company(company: CompanyCreate, db=Depends(get_database)):
    try:
        # Check if company with this website already exists
        existing = await db.companies.find_one({"website": company.website})
        if existing:
            raise HTTPException(status_code=400, detail="Company with this website already exists")

        # Generate unique code
        code = generate_unique_code()
        while await db.companies.find_one({"code": code}):
            code = generate_unique_code()

        # Create new company
        company_model = CompanyModel(
            name=company.name,
            description=company.description,
            website=company.website,
            code=code,
            created_at=datetime.utcnow()
        )
        
        # Convert to dict and log
        company_data = company_model.model_dump(by_alias=True)
        logging.info(f"Company data to insert: {company_data}")

        # Insert into database
        result = await db.companies.insert_one(company_data)
        logging.info(f"Insert result: {result.inserted_id}")
        
        # Get the created company
        created_company = await db.companies.find_one({"_id": result.inserted_id})
        logging.info(f"Retrieved company: {created_company}")
        
        if not created_company:
            raise HTTPException(status_code=500, detail="Failed to retrieve created company")
        
        # Convert ObjectId to string for response
        created_company["id"] = str(created_company["_id"])
        
        return CompanyResponse(**created_company)
    except Exception as e:
        logging.error(f"Error in register_company: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
