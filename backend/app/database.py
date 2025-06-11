from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from bson import ObjectId
from typing import Optional
import os
from dotenv import load_dotenv
import logging

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "cv_align")

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db = None

    @classmethod
    async def connect_db(cls):
        cls.client = AsyncIOMotorClient(MONGODB_URL)
        cls.db = cls.client[DATABASE_NAME]

    @classmethod
    async def close_db(cls):
        if cls.client:
            cls.client.close()

    @classmethod
    def get_db(cls):
        return cls.db

def get_collection(collection_name: str):
    return Database.get_db()[collection_name]

def convert_id(obj):
    if isinstance(obj, dict):
        if "_id" in obj:
            obj["id"] = str(obj.pop("_id"))
        return obj
    return obj

db = Database()

async def get_database():
    return db.db

async def connect_to_mongo():
    try:
        await Database.connect_db()
        
        # Initialize collections and indexes
        if "companies" not in await db.db.list_collection_names():
            await db.db.create_collection("companies")
            await db.db.companies.create_index("website", unique=True)
            logging.info("Initialized companies collection with indexes")
        
        logging.info("Connected to MongoDB successfully")
    except Exception as e:
        logging.error(f"Failed to connect to MongoDB: {str(e)}")
        raise e

async def close_mongo_connection():
    await Database.close_db()
    logging.info("Closed MongoDB connection")
