from http.server import BaseHTTPRequestHandler
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import json

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

def predict(request_data):
    try:
        # Parse and preprocess input
        data = request_data
        df = pd.DataFrame(data)
        df['typeOfAttractions'] = le_attraction.transform(df['typeOfAttractions'])
        df['category'] = le_category.transform(df['category'])

        # Make predictions
        predictions = clf.predict(df)
        decoded_predictions = le_travelStyle.inverse_transform(predictions)

        return {'predictions': decoded_predictions.tolist()}
    except Exception as e:
        return {'error': str(e)}, 500

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        request_body = self.rfile.read(content_length)
        data = json.loads(request_body)
        
        result = predict(data)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())
        return
