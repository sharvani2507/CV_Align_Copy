

from fastapi import APIRouter, Depends, HTTPException
from app.database import Database
from app.routes.auth import get_current_user
from app.models.user import User
from app.utils.mongo_utils import convert_id

router = APIRouter()
db = Database()

def add_recruiter_stats(user):
    user.setdefault('uploaded_cvs', 0)
    user.setdefault('selected_candidates', 0)
    user.setdefault('shortlisted_candidates', 0)
    user.setdefault('status', 'Active')
    # Calculate accuracy
    if user['shortlisted_candidates'] > 0:
        user['accuracy'] = round((user['selected_candidates'] / user['shortlisted_candidates']) * 100, 2)
    else:
        user['accuracy'] = 0.0
    return user

@router.get("/recruiters/")
async def get_all_recruiters(current_user: User = Depends(get_current_user)):
    collection = db.get_collection("users")
    recruiters = await collection.find(
        {"role": "recruiter", "company_code": current_user.company_code}
    ).to_list(length=None)
    return [add_recruiter_stats(convert_id(r)) for r in recruiters]



@router.get("/recruiters/top")
async def get_top_recruiters(current_user: User = Depends(get_current_user)):
    collection = db.get_collection("users")
    recruiters = await collection.find(
        {"role": "recruiter", "company_code": current_user.company_code}
    ).sort("accuracy", -1).limit(3).to_list(length=3)
    return [add_recruiter_stats(convert_id(r)) for r in recruiters]