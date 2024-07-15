from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pose_analysis  # Asegúrate de que el módulo pose_analysis esté en el mismo directorio o en el PATH de Python
import uvicorn
from typing import List
from PIL import Image
import io
import numpy as np
import cv2
import base64

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las fuentes de origen (puedes restringir esto según tus necesidades)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)

@app.post("/procesar_imagen/")
async def procesar_imagen(tipo: str, file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    
    posiciones, image_received = pose_analysis.procesar_imagen(image, tipo)
    
    _, buffer = cv2.imencode('.jpg', image_received)
    image_base64 = base64.b64encode(buffer).decode('utf-8')
    
    return {"posiciones": posiciones, "image": image_base64}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=800)
