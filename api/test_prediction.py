import json
from index import predict

# Test data
test_data = {
    'typeOfAttractions': 'Historical',
    'category': 'Cultural'
}

# Test prediction
result = predict(test_data)
print("Prediction result:", json.dumps(result, indent=2))
