from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGODB_URL, DB_NAME
import logging

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def get_database():
    return db.db

async def connect_to_mongo():
    try:
        db.client = AsyncIOMotorClient(MONGODB_URL)
        db.db = db.client[DB_NAME]
        
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
    if db.client:
        db.client.close()
        logging.info("Closed MongoDB connection")
