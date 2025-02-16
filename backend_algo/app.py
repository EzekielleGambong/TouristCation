from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


clf = joblib.load("model.pkl")
le_attraction = joblib.load("le_attraction.pkl")
le_category = joblib.load("le_category.pkl")
le_travelStyle = joblib.load("le_travelStyle.pkl")

food_model = joblib.load("food_model.pkl")
category_mapping = joblib.load("category_mapping.pkl")

category_reverse_mapping = {v: k for k, v in category_mapping.items()}

shop_model = joblib.load("shop_model.pkl")

@app.route("/predict_shop_category", methods=["POST"])
def predict_shop_category():
    try:
        data = request.json  
        print("Received Data:", data)  # Debugging

        df = pd.DataFrame([data])  

        print("Expected feature names:", shop_model.feature_names_in_)
        print("Received DataFrame columns:", df.columns.tolist())

        for col in shop_model.feature_names_in_:
            df[col] = df.get(col, 0)  

        print("Processed DataFrame:", df)  # Debugging

        predicted_category = shop_model.predict(df)[0]
        print("Predicted Category:", predicted_category)  

        return jsonify({"predicted_category": predicted_category})

    except Exception as e:
        print("Error:", str(e))  
        return jsonify({"error": str(e)})

    
@app.route('/predict', methods=['POST'])
def predict():
    try:
 
        print("Received data:", request.json)

        data = request.json
        df = pd.DataFrame(data)
        df['typeOfAttractions'] = le_attraction.transform(df['typeOfAttractions'])
        df['category'] = le_category.transform(df['category'])

        predictions = clf.predict(df)
        decoded_predictions = le_travelStyle.inverse_transform(predictions)

        print("Predictions:", decoded_predictions)

        return jsonify({'predictions': decoded_predictions.tolist()})
    except Exception as e:
        print("Error:", str(e))  # Log the error
        return jsonify({'error': str(e)})


@app.route("/predict_food", methods=["POST"])
def predict_food():
    try:
        data = request.json
        price = data.get("average_price_range")
        ambiance = data.get("ambiance")
        popularity = data.get("popularity")

        ambiance_mapping = {"poor": 2.0, "decent": 3.0, "excellent": 4.5, "doesn't matter": None}
        popularity_mapping = {"unpopular": 2.0, "somewhat popular": 3.0, "very popular": 4.5, "doesn't matter": None}

        ambiance_rating = ambiance_mapping.get(ambiance, None)
        popularity_rating = popularity_mapping.get(popularity, None)

        if ambiance_rating is None and popularity_rating is None:
            user_rating = 2.5
        elif ambiance_rating is None:
            user_rating = popularity_rating
        elif popularity_rating is None:
            user_rating = ambiance_rating
        else:
            user_rating = (ambiance_rating + popularity_rating) / 2

        user_input = [[price, user_rating]]
        predicted_category_encoded = food_model.predict(user_input)[0]
        predicted_category = category_reverse_mapping[predicted_category_encoded]

        return jsonify({"predicted_category": predicted_category})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
