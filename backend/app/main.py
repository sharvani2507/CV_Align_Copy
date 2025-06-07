from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.routers import company
import logging

# --- Logging Configuration ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# --- App Initialization ---
app = FastAPI(
    title="CV Align API",
    description="Backend for the CV Align recruitment platform",
    version="1.0.0"
)

# --- Event Handlers ---
@app.on_event("startup")
async def startup():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown():
    await close_mongo_connection()

# --- CORS Settings ---
origins = [
    "http://localhost:5173",  # for local Vite development server
    "http://127.0.0.1:5173",
    "http://localhost:3000",  # for local React frontend
    "http://127.0.0.1:3000",
    # Add deployed frontend domains here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(company.router)

# --- Root Endpoint ---
@app.get("/")
def root():
    return {"message": "Welcome to CV Align API"}




