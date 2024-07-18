import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.impute import SimpleImputer

# Load the dataset
data = pd.read_csv("C:/Users/ASUS/Downloads/decision_data.csv")

# Drop 'Unnamed: 4' column
data.drop(columns=['Unnamed: 4'], inplace=True)

# Handle NaN values by filling them with the most frequent value in each column
imputer = SimpleImputer(strategy='most_frequent')
data_filled = pd.DataFrame(imputer.fit_transform(data), columns=data.columns)

# Prepare data
X = data_filled.drop(columns=['Buys Product'])  # Features
y = data_filled['Buys Product']  # Target variable

# Convert categorical variables into numerical representations
X = pd.get_dummies(X)

# Initialize Decision Tree Classifier
dt_classifier = DecisionTreeClassifier()

# Train the classifier
dt_classifier.fit(X, y)

# Display the decision tree
tree_rules = export_text(dt_classifier, feature_names=list(X.columns))
print("Decision Tree Rules:")
print(tree_rules)

# Test the classifier
sample_data = pd.DataFrame({
    'Age': ['Young'],
    'Income': ['Medium'],
    'Credit Card': ['Yes']
})

# Convert categorical variables into numerical representations
sample_data = pd.get_dummies(sample_data)

# Predict the outcome
prediction = dt_classifier.predict(sample_data)
print("\nPrediction for the sample data:")
print("Buys Product:", prediction[0])
