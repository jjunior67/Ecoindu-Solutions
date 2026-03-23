from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/calcular-carbono")
async def calcular_carbon(waste_amount: float = Query(...)):
    """
    Calcula captura de carbono baseado na quantidade de resíduos
    """
    # Fórmula: 1 tonelada de resíduo = 2.5 toneladas CO2 capturado
    carbon_footprint = waste_amount * 2.5
    
    return {
        "carbonFootprint": carbon_footprint,
        "treesEquivalent": carbon_footprint * 0.45,
        "revenuePotential": carbon_footprint * 150
    }