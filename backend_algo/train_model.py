from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("mongoDBURL")
client = MongoClient(MONGO_URI)
db = client["TouristCation"]
collection = db["attractioninformations"]

# Load data from MongoDB
data_cursor = collection.find()
data = pd.DataFrame(list(data_cursor))

# Ensure 'travelStyle' has valid values (at least 2 occurrences)
valid_classes = data['travelStyle'].value_counts()[data['travelStyle'].value_counts() >= 2].index
data_filtered = data[data['travelStyle'].isin(valid_classes)].copy()  # Fix: Use .copy()

# Drop NaN values and convert to string before encoding
data_filtered = data_filtered.dropna(subset=['travelStyle'])
data_filtered['travelStyle'] = data_filtered['travelStyle'].astype(str)

# Encode categorical columns
le_attraction = LabelEncoder()
data_filtered.loc[:, 'typeOfAttractions'] = le_attraction.fit_transform(data_filtered['typeOfAttractions'])

le_category = LabelEncoder()
data_filtered.loc[:, 'category'] = le_category.fit_transform(data_filtered['category'])

le_travelStyle = LabelEncoder()
data_filtered.loc[:, 'travelStyle'] = le_travelStyle.fit_transform(data_filtered['travelStyle'])

# **Fix: Ensure y is an integer array**
data_filtered['travelStyle'] = data_filtered['travelStyle'].astype(int)

# Debug: Check encoded values
print("Encoded travelStyle classes:", le_travelStyle.classes_)
print("Unique y values:", data_filtered['travelStyle'].unique())

# Define features and target variable
X = data_filtered[['typeOfAttractions', 'category']]
y = data_filtered['travelStyle']

# Convert y to an integer NumPy array
y = y.astype(int)  # Fix: Ensure y is treated as an integer class

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train the model
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)  # No more errors 🚀

# Save model and encoders
joblib.dump(clf, 'model.pkl')
joblib.dump(le_attraction, 'le_attraction.pkl')
joblib.dump(le_category, 'le_category.pkl')
joblib.dump(le_travelStyle, 'le_travelStyle.pkl')

print("Model and encoders saved successfully!")
