
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib

# Initialize the FastAPI app
app = FastAPI()

# Load the model
model = joblib.load('xgb_model.joblib')

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
