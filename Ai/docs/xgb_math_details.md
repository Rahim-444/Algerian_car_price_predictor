# Explanation of Objective Function in XGBoost Regressor

## Objective Function
\[
\mathcal{L}(\theta) = \sum_{i=1}^{N} l(y_i, \hat{y}_i^{(t)}) + \sum_{k=1}^{t} \Omega(f_k)
\]

This objective function in XGBoost has two main components:
1. **Loss Function (\( \sum_{i=1}^{N} l(y_i, \hat{y}_i^{(t)}) \))**: This part measures how well the model's predictions match the actual data.
2. **Regularization Term (\( \sum_{k=1}^{t} \Omega(f_k) \))**: This part penalizes the complexity of the model to prevent overfitting.

### Detailed Explanation

1. **Prediction for Instance \(i\) at Iteration \(t\) (\(\hat{y}_i^{(t)}\))**:
   - \( \hat{y}_i^{(t)} \) represents the prediction made by the model for the \( i \)-th instance (data point) at the \( t \)-th iteration.
   - In gradient boosting, the model is built iteratively. At each iteration \( t \), a new tree is added to the ensemble to improve the prediction of the previous trees.
   - Initially, \( \hat{y}_i^{(0)} \) might be a simple prediction like the mean of the target values. With each subsequent iteration, the prediction \( \hat{y}_i^{(t)} \) is updated to better fit the data by reducing the residual errors of the previous predictions.

2. **Regularization Term (\(\Omega(f_k)\))**:
   - \( \Omega(f_k) \) is a function that penalizes the complexity of the \( k \)-th tree in the model. This is crucial in preventing overfitting, where the model becomes too complex and captures noise in the training data rather than generalizing well to new data.
   - The regularization term can include several components, such as the number of leaves in the tree and the magnitude of the leaf weights. A common form of regularization in XGBoost is:
     \[
     \Omega(f_k) = \gamma T + \frac{1}{2} \lambda \sum_{j=1}^{T} w_j^2
     \]
     - \( \gamma \): A parameter that penalizes the number of leaves \( T \) in the tree, discouraging the creation of overly complex trees.
     - \( \lambda \): A parameter that penalizes the sum of the squared leaf weights \( w_j \). This prevents the leaf weights from becoming too large, which could also lead to overfitting.

### Objective Function :

<img src="https://dz2cdn1.dzone.com/storage/temp/13069536-formula-flexibility-loss.png"></img>

#### Regularization
<img src="https://miro.medium.com/v2/resize:fit:730/1*a9oc2btFoRDoUVsVOPN5gg.png"></img>

Where:

    T: is the number of leaves (terminal nodes) in the tree.
    w: is the weight (output value) of the jj-th leaf.
    γ: is a parameter that penalizes the number of leaves in the tree.
    λ :is a parameter that penalizes the sum of the squared leaf weights.

## Putting It Together

In the context of XGBoost Regressor, the goal is to minimize the objective function \( \mathcal{L}(\theta) \). This involves:
- Reducing the error between the actual values \( y_i \) and the predicted values \( \hat{y}_i^{(t)} \) (loss function).
- Keeping the model simple and generalizable by penalizing complex trees through the regularization term \( \Omega(f_k) \).

By iteratively adding trees and updating predictions while penalizing complexity, XGBoost aims to create a model that accurately predicts new data while avoiding overfitting to the training data.


### Balencing

<img src="https://raw.githubusercontent.com/dmlc/web-data/master/xgboost/model/step_fit.png"/>
