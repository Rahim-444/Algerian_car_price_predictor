from fastapi import FastAPI
from pydantic import BaseModel
from keras.models import load_model
import numpy as np

app = FastAPI()

class PredictionInput(BaseModel):
    feature_values: list

@app.post("/predict/")
async def predict(input_data: PredictionInput):
    feature_values = np.array([input_data.feature_values])
    # Load the saved model
    loaded_model = load_model("ann_model.h5")

    # Use the loaded model to make predictions
    prediction = loaded_model.predict(feature_values)

    return {"prediction": prediction[0][0]}
