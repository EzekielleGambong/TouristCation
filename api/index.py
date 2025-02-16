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
        return {'error': str(e)}, 500

def handler(request):
    if request.method == 'POST':
        try:
            # Read the request body
            content_length = int(request.headers.get('Content-Length', 0))
            body = request.rfile.read(content_length)
            data = json.loads(body)
            
            # Make prediction
            result = predict(data)
            
            # Send response
            request.send_response(200)
            request.send_header('Content-Type', 'application/json')
            request.send_header('Access-Control-Allow-Origin', '*')
            request.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            request.send_header('Access-Control-Allow-Headers', 'Content-Type')
            request.end_headers()
            request.wfile.write(json.dumps(result).encode())
            return
            
        except Exception as e:
            request.send_response(500)
            request.send_header('Content-Type', 'application/json')
            request.send_header('Access-Control-Allow-Origin', '*')
            request.end_headers()
            request.wfile.write(json.dumps({'error': str(e)}).encode())
            return
            
    elif request.method == 'OPTIONS':
        # Handle CORS preflight request
        request.send_response(200)
        request.send_header('Access-Control-Allow-Origin', '*')
        request.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        request.send_header('Access-Control-Allow-Headers', 'Content-Type')
        request.end_headers()
        return
        
    else:
        request.send_response(405)
        request.send_header('Content-Type', 'application/json')
        request.end_headers()
        request.wfile.write(json.dumps({'error': 'Method not allowed'}).encode())
        return

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        handler(self)
        
    def do_OPTIONS(self):
        handler(self)
