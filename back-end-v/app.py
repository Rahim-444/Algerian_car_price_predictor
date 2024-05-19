from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import pandas as pd
import joblib


# Environment variables
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "feedback_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "feedbacks")


# Initialize the FastAPI app
app = FastAPI()

# MongoDB client
client = AsyncIOMotorClient(MONGODB_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]


# Load the model
model = joblib.load('xgb_model.joblib')


# Feedback model
class Feedback(BaseModel):
    name: str
    email: EmailStr
    message: str



class CarData(BaseModel):
    notRepairedDamage: str
    vehicleType: str
    abtest: str
    gearbox: str
    model: str
    fuelType: str
    brand: str
    mileage: float
    registrationYear: int
    powerPS: int
    kilometer: int


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
         data = pd.DataFrame([car_data.dict()])

         print("Input DataFrame:")
         print(data)
        
         cat_cols = ["notRepairedDamage", "vehicleType", "abtest", "gearbox", "model", "fuelType", "brand"]
         for col in cat_cols:
            data[col] = data[col].astype('category').cat.codes

         required_columns = ['notRepairedDamage', 'vehicleType', 'abtest', 'gearbox', 'model', 'fuelType', 'brand', 'mileage', 'registrationYear', 'powerPS']
         data = data[required_columns]

         prediction = model.predict(data.values)
         return {
             "prediction-price":int(prediction[0]*12)
         }
            
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/") 
def read_root():
    return {"message": "Welcome to the car price prediction API!"}
