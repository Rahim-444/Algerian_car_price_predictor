from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib

# Initialize the FastAPI app
app = FastAPI()

# Load the model
model = joblib.load('xgb_model.joblib')

# Define the data model for the request
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

# Define the endpoint for predictions
@app.post("/predict")
def predict_price(car_data: CarData):
    try:
        # Create a DataFrame from the request data
        data = pd.DataFrame([car_data.dict()])

        # Debugging: Print the input data
        print("Input DataFrame:")
        print(data)

        # Preprocess the data (assuming similar preprocessing steps as before)
        cat_cols = ["notRepairedDamage", "vehicleType", "abtest", "gearbox", "model", "fuelType", "brand"]
        for col in cat_cols:
            data[col] = data[col].astype('category').cat.codes

        # Ensure the data has exactly 10 columns
        required_columns = ['notRepairedDamage', 'vehicleType', 'abtest', 'gearbox', 'model', 'fuelType', 'brand', 'mileage', 'registrationYear', 'powerPS']
        
        # Remove any unexpected columns
        data = data[required_columns]

        # Debugging: Print the preprocessed data
        print("Preprocessed DataFrame:")
        print(data)

        # Perform prediction
        prediction = model.predict(data.values)

        # Convert the prediction result to a regular Python data structure (e.g., a dictionary)
        prediction_result = {"predicted_price": int(prediction[0]*12)}
        return prediction_result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Define a root endpoint for health check
@app.get("/")
def read_root():
    return {"message": "Welcome to the car price prediction API!"}
