from sqlalchemy_utils import database_exists, create_database, drop_database
from app.database import engine, Base
from app.config import DATABASE_URL
from app.models import Company, HiringManager  # This will ensure all models are imported

def init_db():
    print(f"Initializing database at {DATABASE_URL}")
    
    # Drop database if it exists
    if database_exists(DATABASE_URL):
        print("Dropping existing database...")
        drop_database(DATABASE_URL)
    
    # Create new database
    print("Creating new database...")
    create_database(DATABASE_URL)
    
    # Create all tables
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database initialization complete!") 