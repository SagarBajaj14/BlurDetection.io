from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io
import base64
import requests

app = FastAPI()

ROBOFLOW_API_KEY = ""
ROBOFLOW_MODEL_ENDPOINT = f"https://classify.roboflow.com/blurdetection-d9o8a/1?api_key={ROBOFLOW_API_KEY}"

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        encoded_image = base64.b64encode(image_bytes).decode("utf-8")

        # Send image to Roboflow API
        response = requests.post(
            ROBOFLOW_MODEL_ENDPOINT,
            data=encoded_image,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )

        if response.status_code != 200:
            return JSONResponse(
                status_code=response.status_code,
                content={"error": f"Roboflow API error: {response.text}"}
            )

        result = response.json()
        top_prediction = result["predictions"][0] if result.get("predictions") else {}
        label = top_prediction.get("class", "Unknown")
        confidence = top_prediction.get("confidence", 0)

        return JSONResponse({
            "prediction": label,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

