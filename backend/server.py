from fastapi import FastAPI, APIRouter, HTTPException, Query
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

# Create the main app
app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Rotas existentes
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

# Rota de cálculo de carbono (versão 1 - compatível com o formato original)
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

# Rota de cálculo de carbono (versão 2 - formato que o frontend espera)
@api_router.post("/calcular-carbono")
async def calcular_carbono(
    waste_amount: float = Query(..., description="Quantidade de resíduos em kg"),
    energy_usage: Optional[float] = Query(0, description="Consumo de energia em kWh (opcional)")
):
    """
    Calcula a pegada de carbono baseado em resíduos e consumo de energia
    """
    # Fórmula simples para teste (ajuste conforme necessário)
    fator_residuo = 2.5  # kg CO2 por kg de resíduo
    fator_energia = 0.4   # kg CO2 por kWh
    
    resultado = (waste_amount * fator_residuo) + (energy_usage * fator_energia)
    
    return {
        "carbonFootprint": round(resultado, 2),
        "unit": "kg CO₂e",
        "message": f"Emissão estimada: {round(resultado, 2)} kg CO₂e",
        "details": {
            "from_waste": round(waste_amount * fator_residuo, 2),
            "from_energy": round(energy_usage * fator_energia, 2)if energy_usage else 0
        }
    }

# Versão GET para teste direto no navegador
@api_router.get("/calcular-carbono")
async def calcular_carbono_get(
    waste_amount: float = Query(..., description="Quantidade de resíduos em kg"),
    energy_usage: Optional[float] = Query(0, description="Consumo de energia em kWh (opcional)")
):
    """Versão GET para teste direto no navegador"""
    return await calcular_carbono(waste_amount, energy_usage)

# Include the router in the main app
app.include_router(api_router)

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Fecha a conexão com o MongoDB ao desligar"""
    client.close()

# Ponto de entrada para executar diretamente
if __name__ == "__main__":
    import uvicorn
    print("🚀 Servidor iniciando em http://127.0.0.1:8000")
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)