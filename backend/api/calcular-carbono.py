from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Permite CORS para funcionar no site
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Resposta simples para teste
        self.wfile.write(json.dumps({"status": "API funcionando!"}).encode())
        return
    
    def do_POST(self):
        # Configura CORS
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Pega os parâmetros da URL
        query = parse_qs(urlparse(self.path).query)
        
        # Extrai valores com fallback para 0
        waste = float(query.get('waste_amount', ['0'])[0])
        energy = float(query.get('energy_usage', ['0'])[0])
        
        # FÓRMULA DE CÁLCULO - você pode ajustar depois
        fator_residuo = 2.5  # kg CO2 por kg de resíduo
        fator_energia = 0.4   # kg CO2 por kWh
        
        resultado = (waste * fator_residuo) + (energy * fator_energia)
        
        # Prepara resposta
        response = {
            'carbonFootprint': round(resultado, 2),
            'unit': 'kg CO₂e',
            'message': f'Emissão estimada: {round(resultado, 2)} kg CO₂e'
        }
        
        self.wfile.write(json.dumps(response).encode())
        return