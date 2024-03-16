# Car Price Prediction Project

## Overview
This project aims to predict the prices of cars using machine learning (ML) and deep learning (DL) techniques. The project utilizes a dataset containing features of various cars such as make, model, year, mileage, and other relevant attributes. We have implemented both traditional ML models and DL models to predict car prices.

## Features
- **Machine Learning Models**:
  - Implemented various ML algorithms including linear regression, random forest, and gradient boosting.
  - Utilized techniques like feature engineering, feature scaling, and hyperparameter tuning to improve model performance.

- **Deep Learning Models**:
  - Developed neural network architectures using libraries like TensorFlow and Keras.
  - Explored different architectures including feedforward neural networks, convolutional neural networks (CNNs), and recurrent neural networks (RNNs).
  - Employed techniques like dropout regularization and batch normalization to prevent overfitting.

- **Full-Stack Implementation**:
  - Developed a web application using the Next.js framework for the frontend.
  - Integrated the ML and DL models into the backend using Flask or FastAPI.
  - Implemented a user-friendly interface for users to input car features and receive predicted prices.
  
- **Real world data**:
  - Real-world data collected from Algerien websites.
  - Large dataset that helps with getting the best predictions.

## Project Structure
The project is organized into the following directories:

- **data/**: Contains the dataset used for training and testing the models.
- **notebooks/**: Jupyter notebooks used for exploratory data analysis (EDA), model development, and evaluation.
- **models/**: Saved trained models.
- **src/**: Source code for the web application.
  - **backend/**: Backend code implementing the ML and DL models.
  - **frontend/**: Frontend code for the Next.js application.

## Usage
1. **Setup Environment**:
   - Install required dependencies using `pip install -r requirements.txt`.
   - Ensure Node.js and npm are installed for the frontend setup.

2. **Training Models**:
   - Explore the Jupyter notebooks in the `notebooks/` directory for EDA and model development.
   - Train ML and DL models using the provided scripts.

3. **Web Application**:
   - Navigate to the `src/frontend/` directory.
   - Run `npm install` to install frontend dependencies.
   - Start the Next.js development server with `npm run dev`.

4. **Testing**:
   - Test the functionality of the web application by navigating to the provided URL in a web browser.
   - Submit car features through the interface and observe predicted prices.

## Contributors
- Dana Amine (@DanaAmine): Data Scientist, ML model development
- Rahim (@Rahim444): Full-Stack Developer, Web application implementation

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
