from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

# Load and preprocess data
data = pd.read_csv('merged_file.csv')
valid_classes = data['travelStyle'].value_counts()[data['travelStyle'].value_counts() >= 2].index
data_filtered = data[data['travelStyle'].isin(valid_classes)]

le_attraction = LabelEncoder()
data_filtered['typeOfAttractions'] = le_attraction.fit_transform(data_filtered['typeOfAttractions'])

le_category = LabelEncoder()
data_filtered['category'] = le_category.fit_transform(data_filtered['category'])

le_travelStyle = LabelEncoder()
data_filtered['travelStyle'] = le_travelStyle.fit_transform(data_filtered['travelStyle'])

X = data_filtered[['typeOfAttractions', 'category']]
y = data_filtered['travelStyle']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train the model
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

# Save model and encoders
joblib.dump(clf, 'model.pkl')
joblib.dump(le_attraction, 'le_attraction.pkl')
joblib.dump(le_category, 'le_category.pkl')
joblib.dump(le_travelStyle, 'le_travelStyle.pkl')
