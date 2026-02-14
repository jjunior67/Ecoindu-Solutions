from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ConsultationRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    contact_name: str
    email: EmailStr
    phone: str
    industry: str
    project_type: str
    message: Optional[str] = None
    preferred_date: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class ConsultationRequestCreate(BaseModel):
    company_name: str
    contact_name: str
    email: EmailStr
    phone: str
    industry: str
    project_type: str
    message: Optional[str] = None
    preferred_date: Optional[str] = None

class CarbonCalculation(BaseModel):
    waste_amount: float
    energy_usage: float
    carbon_saved: float
    trees_equivalent: int
    revenue_potential: float


@api_router.get("/")
async def root():
    return {"message": "EcoIndus Solutions API"}

@api_router.post("/consultation", response_model=ConsultationRequest)
async def create_consultation_request(input: ConsultationRequestCreate):
    """Create a new consultation request"""
    consultation_dict = input.model_dump()
    consultation_obj = ConsultationRequest(**consultation_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = consultation_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.consultation_requests.insert_one(doc)
    return consultation_obj

@api_router.get("/consultations", response_model=List[ConsultationRequest])
async def get_consultation_requests():
    """Get all consultation requests"""
    consultations = await db.consultation_requests.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for consultation in consultations:
        if isinstance(consultation['created_at'], str):
            consultation['created_at'] = datetime.fromisoformat(consultation['created_at'])
    
    return consultations

@api_router.post("/calculate-carbon")
async def calculate_carbon(waste_amount: float, energy_usage: float):
    """Calculate carbon savings and potential revenue"""
    # Simple calculation logic (can be enhanced with real formulas)
    carbon_saved = (waste_amount * 0.5) + (energy_usage * 0.3)
    trees_equivalent = int(carbon_saved * 16)
    revenue_potential = carbon_saved * 50  # $50 per ton of CO2
    
    return CarbonCalculation(
        waste_amount=waste_amount,
        energy_usage=energy_usage,
        carbon_saved=round(carbon_saved, 2),
        trees_equivalent=trees_equivalent,
        revenue_potential=round(revenue_potential, 2)
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()