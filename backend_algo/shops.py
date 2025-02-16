import pandas as pd
import joblib
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

# Load dataset
file_name = "Shops_cleaned.csv"
data = pd.read_csv(file_name, encoding='latin1')

# Preprocess data (as in your existing Python script)
data.columns = data.columns.str.lower()
data['average_price_range'] = pd.to_numeric(data['average_price_range'], errors='coerce')
data['average_price_range'].fillna(data['average_price_range'].mean(), inplace=True)

# Categorization function
def categorize_shop(price):
    if price < 50:
        return 'Budget-Friendly'
    elif price >= 100:
        return 'Luxury'
    else:
        return 'Unique/Specialty'

data['category'] = data['average_price_range'].apply(categorize_shop)

# Balance classes
min_class_count = data['category'].value_counts().min()
balanced_data = data.groupby('category', group_keys=False).apply(lambda x: x.sample(min(5, len(x)), replace=True))

# One-hot encode categorical features
categorical_columns = ['store_type']
balanced_data = pd.get_dummies(balanced_data, columns=categorical_columns, drop_first=True)

# Prepare training data
X = balanced_data[['average_price_range'] + [col for col in balanced_data.columns if col.startswith("store_type_")]]
y = balanced_data['category']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Train Decision Tree model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "shop_model.pkl")

print("Model trained and saved as 'shop_model.pkl'")
