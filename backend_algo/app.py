from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the model and encoders
clf = joblib.load('model.pkl')
le_attraction = joblib.load('le_attraction.pkl')
le_category = joblib.load('le_category.pkl')
le_travelStyle = joblib.load('le_travelStyle.pkl')

@app.route('/predict', methods=['POST'])
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
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
