from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
import os
import pandas as pd
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder
from datetime import datetime

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "feedback_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "feedbacks")

app = FastAPI()

client = AsyncIOMotorClient(MONGODB_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

model = joblib.load('xgb_model.joblib')

class Feedback(BaseModel):
    name: str
    email: EmailStr
    message: str

class CarData(BaseModel):
    abtest: str
    vehicleType: str
    yearOfRegistration: int
    gearbox: str
    powerPS: int
    model: str
    kilometer: int
    fuelType: str
    brand: str
    notRepairedDamage: str

@app.post("/feedback")
async def create_feedback(feedback: Feedback):
    feedback_dict = feedback.dict()
    feedback_dict["createdAt"] = datetime.utcnow()
    result = await collection.insert_one(feedback_dict)
    if result.inserted_id:
        return {"id": str(result.inserted_id)}
    else:
        raise HTTPException(status_code=500, detail="Failed to save feedback")

@app.post("/predict")
def predict_price(car_data: CarData):
    try:
        # Convert the car data to a DataFrame
        data_dict = car_data.dict()
        data_dict = {key: [value] for key, value in data_dict.items()}
        data = pd.DataFrame(data_dict)

        # Define the categorical columns and required columns
        cat_cols = ["notRepairedDamage", "vehicleType", "abtest", "gearbox", "model", "fuelType", "brand"]
        required_columns = ['yearOfRegistration', 'powerPS', 'kilometer']
        feature_order = cat_cols + required_columns

        # Log the received data
        print("Received data:")
        print(data)

        # Load the label encoders and transform the categorical data
        try:
            for col in cat_cols:
                le = joblib.load(f'{col}_encoder.joblib')
                if data[col].values[0] in le.classes_:
                    data[col] = le.transform(data[col])
                else:
                    # If the value is not in the label encoder classes, mark it as unknown (-1)
                    data[col] = -1
        except Exception as e:
            print(e)

        # Log the transformed data
        print("Transformed data:")
        print(data)

        # Ensure the DataFrame has all the required columns
        for col in required_columns:
            if col not in data.columns:
                data[col] = np.nan

        # Reorder the columns in the DataFrame
        data = data[feature_order]

        # Handle missing values (optional)
        data = data.fillna(-1)  # or use another method to handle missing values

        # Log the final data to be used for prediction
        print("Final data for prediction:")
        print(data)

        # Make the prediction
        prediction = model.predict(data)

        return {
            "prediction-price": int(prediction[0] * 12)  # Assuming the model output needs to be scaled by 12
        }

    except Exception as e:
        print(e)
        return {
            "error": str(e)
        }

@app.get("/")
def read_root():
    return {"message": "Welcome to the car price prediction API!"}
