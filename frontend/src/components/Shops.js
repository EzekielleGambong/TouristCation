import React, { useState } from "react";
import axios from "axios";

const ShopCategorization = () => {
  const [userInput, setUserInput] = useState({
    average_price_range: "",
    store_type: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    // Expected store types from the backend
    const expectedStoreTypes = ["café", "restaurant", "bakery", "One-Town"]; // Add any missing types
  
    let requestData = { average_price_range: parseFloat(userInput.average_price_range) };
  
    expectedStoreTypes.forEach((type) => {
      requestData[`store_type_${type}`] = userInput.store_type === type ? 1 : 0;
    });
  
    try {
      console.log("Sending Data:", requestData);
      const response = await axios.post("http://localhost:5000/predict_shop_category", requestData);
      console.log("API Response:", response.data);
      setPrediction(response.data.predicted_category);
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("Failed to make prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Shop Category Predictor</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium">Average Price Range</label>
          <input
            type="number"
            name="average_price_range"
            value={userInput.average_price_range}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">Select Store Type</label>
          <select
            name="store_type"
            value={userInput.store_type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Store Type</option>
            <option value="café">Café</option>
            <option value="restaurant">Restaurant</option>
            <option value="bakery">Bakery</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-6 py-3 text-white font-semibold rounded-lg ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {error && <p className="mt-6 text-center text-red-600">{error}</p>}
      {prediction && <p className="mt-6 text-center text-lg font-medium">Predicted Shop Category: {prediction}</p>}
    </div>
  );
};

export default ShopCategorization;
