from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load the trained model
model = load('model.pkl')
vectorizer = load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame(data)
    # df = df.stack().reset_index(drop=True).to_frame()

    print(df.columns)


    
    # Preprocess and predict

    df = vectorizer.transform(df)
    prediction = model.predict(df)
    
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
