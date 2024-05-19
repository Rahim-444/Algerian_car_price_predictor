import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingRegressor

import joblib

app = FastAPI()

# Load the trained model
model = joblib.load("model.joblib")

# Define input data schema
class InputData(BaseModel):
    powerPS: float
    kilometer: float
    monthsUsed: float
    seller: int
    offerType: int
    abtest: int
    gearbox: int
    notRepairedDamage: int
    fuelType: str
    vehicleType: str
    yearOfRegistration: int
    monthOfRegistration: int
    postalCode: int
    nrOfPictures: int
    dateCrawled: str
    lastSeen: str
    dateCreated: str
    name: str
    model: str
    brand: str


def preproc(df):
    df['dateCrawled']=pd.to_datetime(df['dateCrawled'])
    df['dateCreated']=pd.to_datetime(df['dateCreated'])
    df['lastSeen']=pd.to_datetime(df['lastSeen'])
    modelPowerPSdf = pd.DataFrame(df[(df['model'].notna())&(df['powerPS']>10)&(df['powerPS']<10**3)].groupby(['model'])['powerPS'].mean())
    modelPowerPSdf=modelPowerPSdf.reset_index()
    df=df.merge(modelPowerPSdf, on ='model', suffixes=('', '_tomap'), how='left')
    df['powerPS'] = np.where((df['powerPS_tomap'].notna())&(df['model'].notna())&((df['powerPS']>10**3)|(df['powerPS']<10)), df['powerPS_tomap'], df['powerPS'])
    df.drop(['powerPS_tomap'],axis=1, inplace=True)
    del modelPowerPSdf
    vTypePowerPSdf = pd.DataFrame(df[(df['vehicleType'].notna())&(df['powerPS']>10)&(df['powerPS']<10**3)].groupby(['vehicleType'])['powerPS'].mean())
    vTypePowerPSdf=vTypePowerPSdf.reset_index()
    df=df.merge(vTypePowerPSdf, on ='vehicleType', suffixes=('', '_tomap'), how='left')
    df['powerPS'] = np.where((df['powerPS_tomap'].notna())&(df['vehicleType'].notna())&((df['powerPS']>10**3)|(df['powerPS']<10)), df['powerPS_tomap'], df['powerPS'])
    df.drop(['powerPS_tomap'],axis=1, inplace=True)
    del vTypePowerPSdf
    modelKilometerYearDF=pd.DataFrame(df[(df['model'].notna())&(df['yearOfRegistration']<=2015)&(df['yearOfRegistration']>=1960)].groupby(['model', 'kilometer'])['yearOfRegistration'].mean())
    modelKilometerYearDF=modelKilometerYearDF.reset_index()
    df=df.merge(modelKilometerYearDF, on=['model', 'kilometer'], suffixes=('', '_tomap'), how='left')
    df['yearOfRegistration']=np.where((df['yearOfRegistration_tomap'].notna())&(df['model'].notna())&((df['yearOfRegistration']>2015)|(df['yearOfRegistration']<1960)), df['yearOfRegistration_tomap'], df['yearOfRegistration'])
    del modelKilometerYearDF
    df.drop(['yearOfRegistration_tomap'], axis=1, inplace=True)
    mappingDF=pd.DataFrame(df[(df['brand'].notna())&(df['yearOfRegistration']<=2015)&(df['yearOfRegistration']>=1960)].groupby(['brand', 'powerPS', 'kilometer'])['yearOfRegistration'].mean())
    mappingDF=mappingDF.reset_index()
    df=df.merge(mappingDF, on=['brand', 'powerPS', 'kilometer'], suffixes=('', '_tomap'), how='left')
    df['yearOfRegistration']=np.where((df['yearOfRegistration_tomap'].notna())&(df['brand'].notna())&((df['yearOfRegistration']>2015)|(df['yearOfRegistration']<1960)), df['yearOfRegistration_tomap'], df['yearOfRegistration'])
    del mappingDF
    df.drop(['yearOfRegistration_tomap'], axis=1, inplace=True)
    # Get the time (days) to sale the car
    df['DaysToSales'] = (df['lastSeen'] - df['dateCreated']).dt.days

    df['monthsUsed']=(pd.DatetimeIndex(df['dateCreated']).year-df['yearOfRegistration'])*12+pd.DatetimeIndex(df['dateCreated']).month-df['monthOfRegistration']
    df['seller'] = pd.factorize(df['seller'])[0]
    df['offerType']= pd.factorize(df['offerType'])[0]
    df['abtest'] = pd.factorize(df['abtest'])[0]
    temp_gearbox_df=df[df['model'].notna()].groupby('model')['gearbox'].agg(lambda x: pd.Series.mode(x)[0]).to_frame()
    temp_gearbox_df=temp_gearbox_df.reset_index()
    df=df.merge(temp_gearbox_df, on='model', suffixes=('','_tomap'), how='left')
    df['gearbox']= np.where((df['gearbox'].isna())&(df['model'].notna()), df['gearbox_tomap'], df['gearbox'])
    del temp_gearbox_df
    df.drop(['gearbox_tomap'], axis=1, inplace=True)
    df['gearbox'].fillna(df['gearbox'].agg(lambda x: pd.Series.mode(x)[0]), inplace=True)
    df['gearbox']=pd.factorize(df['gearbox'])[0]
    temp_fuelType_df=df[df['model'].notna()].groupby('model')['fuelType'].agg(lambda x: pd.Series.mode(x)[0]).to_frame()
    temp_fuelType_df=temp_fuelType_df.reset_index()
    df=df.merge(temp_fuelType_df, on='model', suffixes=('','_tomap'), how='left')
    df['fuelType']= np.where((df['fuelType'].isna())&(df['model'].notna()), df['fuelType_tomap'], df['fuelType'])
    del temp_fuelType_df



    df.drop(['fuelType_tomap'], axis=1, inplace=True)
    df['fuelType'].fillna('andere', inplace=True)
    enc=pd.get_dummies(df['fuelType'], prefix='fuelType')
    df=df.join(enc)
    del enc
    temp_vehicleType_df=df[df['model'].notna()].groupby('model')['vehicleType'].agg(lambda x: pd.Series.mode(x)[0]).to_frame()
    temp_vehicleType_df=temp_vehicleType_df.reset_index()
    df=df.merge(temp_vehicleType_df, on='model', suffixes=('','_tomap'), how='left')
    df['vehicleType']= np.where((df['vehicleType'].isna())&(df['model'].notna()), df['vehicleType_tomap'], df['vehicleType'])
    del temp_vehicleType_df
    enc=pd.get_dummies(df['vehicleType'], prefix='vehicleType')
    df=df.join(enc)
    del enc
    df.drop(['vehicleType_tomap'], axis=1, inplace=True)
    df['vehicleType'].fillna(df['vehicleType'].agg(lambda x: pd.Series.mode(x)[0]), inplace=True)
    df['notRepairedDamage']=pd.factorize(df['notRepairedDamage'])[0]
    df['notRepairedDamage'].replace(-1,0, inplace=True)
    df['powerPS']=(df['powerPS']-df['powerPS'].mean())/df['powerPS'].std()
    df['kilometer']=(df['kilometer']-df['kilometer'].mean())/df['kilometer'].std()
    df['monthsUsed']=(df['monthsUsed']-df['monthsUsed'].mean())/df['monthsUsed'].std()
    df.drop(['yearOfRegistration', 'monthOfRegistration', 'postalCode', 'nrOfPictures', 'dateCrawled', 'lastSeen', 'dateCreated', 'name', 'vehicleType',
        'model', 'fuelType', 'brand'], axis=1, inplace=True)
    return df


# Prediction function
def predict(data: pd.DataFrame) -> np.ndarray:
    # Preprocess input data
    preprocessed_data = preproc(data)
    # Make prediction
    prediction = model.predict(preprocessed_data)
    return prediction

# Prediction endpoint
@app.post("/predict")
def predict_endpoint(data: InputData):
    try:
        # Convert input data to DataFrame
        df = pd.DataFrame(data.dict(), index=[0])
        # Make prediction
        prediction = predict(df)
        return {"prediction":type(prediction[0]) }  # Assuming single prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



if __name__ == '__main__':
    app.run(debug=True)