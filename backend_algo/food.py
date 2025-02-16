import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load Data
data = pd.read_csv("food_cleaned.csv", encoding="ISO-8859-1")

# Define category mapping
category_mapping = {"Budget-Friendly": 0, "Moderate": 1, "Luxury": 2}

# Function to map price to category
def map_price_to_category(price):
    if price <= 300:
        return "Budget-Friendly"
    elif 300 < price <= 600:
        return "Moderate"
    else:
        return "Luxury"

# Apply transformations
data["Category"] = data["average_price_range"].apply(map_price_to_category)
data["Category_Encoded"] = data["Category"].map(category_mapping)

# Define Features and Target
X = data[["average_price_range", "rating"]]
y = data["Category_Encoded"]

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Decision Tree
tree = DecisionTreeClassifier(max_depth=3, min_samples_split=4, min_samples_leaf=2, random_state=42)
tree.fit(X_train, y_train)

# Save the model and category mapping
joblib.dump(tree, "food_model.pkl")
joblib.dump(category_mapping, "category_mapping.pkl")
