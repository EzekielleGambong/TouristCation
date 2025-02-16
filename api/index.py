from http.server import BaseHTTPRequestHandler
import json
import joblib
import pandas as pd
import os
from urllib.parse import parse_qs

# Get the directory containing the current file
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_algo_dir = os.path.join(os.path.dirname(current_dir), 'backend_algo')

# Load the model and encoders with absolute paths
try:
    clf = joblib.load(os.path.join(backend_algo_dir, 'model.pkl'))
    le_attraction = joblib.load(os.path.join(backend_algo_dir, 'le_attraction.pkl'))
    le_category = joblib.load(os.path.join(backend_algo_dir, 'le_category.pkl'))
    le_travelStyle = joblib.load(os.path.join(backend_algo_dir, 'le_travelStyle.pkl'))
except Exception as e:
    print(f"Error loading models: {str(e)}")

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
        return {'error': str(e)}

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
    def do_POST(self):
        try:
            # Read the request body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)
            
            # Make prediction
            result = predict(data)
            
            # Send response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
