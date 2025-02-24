from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Get the directory containing the current file
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_algo_dir = os.path.join(os.path.dirname(current_dir), 'backend_algo')

# Load the model and encoders with absolute paths
clf = joblib.load(os.path.join(backend_algo_dir, 'model.pkl'))
le_attraction = joblib.load(os.path.join(backend_algo_dir, 'le_attraction.pkl'))
le_category = joblib.load(os.path.join(backend_algo_dir, 'le_category.pkl'))
le_travelStyle = joblib.load(os.path.join(backend_algo_dir, 'le_travelStyle.pkl'))

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Log the incoming request
        print("Received data:", request.json)

        # Parse and preprocess input
        data = request.json
        df = pd.DataFrame(data)
        df['typeOfAttractions'] = le_attraction.transform(df['typeOfAttractions'])
        df['category'] = le_category.transform(df['category'])

        # Make predictions
        predictions = clf.predict(df)
        decoded_predictions = le_travelStyle.inverse_transform(predictions)

        # Log predictions
        print("Predictions:", decoded_predictions)

        return jsonify({'predictions': decoded_predictions.tolist()})
    except Exception as e:
        print("Error:", str(e))  # Log the error
        return jsonify({'error': str(e)}), 500

# For local development
if __name__ == '__main__':
    app.run(debug=True, port=5000)
