from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Na Vercel, o caminho do arquivo já define a rota. 
# Se o arquivo é api/calcular-carbono.py, use "/" aqui:
@app.post("/")
async def calcular_carbon(waste_amount: float = Query(...)):
    carbon_footprint = waste_amount * 2.5
    
    return {
        "carbonFootprint": carbon_footprint,
        "treesEquivalent": carbon_footprint * 0.45,
        "revenuePotential": carbon_footprint * 150
    }