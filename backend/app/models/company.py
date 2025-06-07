from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")
        return field_schema

class CompanyModel(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str
    description: str
    website: str
    code: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True
        arbitrary_types_allowed = True
        from_attributes = True

    def model_dump(self, by_alias=True, **kwargs):
        data = super().model_dump(by_alias=by_alias, **kwargs)
        if '_id' in data and data['_id'] is None:
            del data['_id']
        return data

class CompanyCreate(BaseModel):
    name: str
    description: str
    website: str

class CompanyResponse(BaseModel):
    id: str
    name: str
    description: str
    website: str
    code: str
    created_at: datetime
