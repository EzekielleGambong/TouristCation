import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api";
import { updateProfile } from "../services/api";
import axios from "axios";

const FoodPrediction = () => {
  const [userInput, setUserInput] = useState({
    average_price_range: "",
    ambiance: "",
    popularity: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await updateProfile(profile);
      const response = await axios.post("http://localhost:5000/predict_food", userInput);
      setPrediction(response.data.predicted_category);
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("Failed to make prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchProfile();
        console.log("Fetched Profile Data:", data); // Debug log
        setProfile(data);
  
        setUserInput({
          average_price_range: data.average_price_range ?? "", // Use ?? to prevent null values
          ambiance: data.ambiance ?? "",
          popularity: data.popularity ?? "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    loadProfile();
  }, []);
  
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Food Price Category Predictor</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium">Enter Average Price:</label>
          <input
            type="number"
            name="average_price_range"
            value={userInput.average_price_range}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">Ambiance:</label>
          <select
            name="ambiance"
            value={userInput.ambiance}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="poor">Poor</option>
            <option value="decent">Decent</option>
            <option value="excellent">Excellent</option>
            <option value="doesn't matter">Doesn't Matter</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">Popularity:</label>
          <select
            name="popularity"
            value={userInput.popularity}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="unpopular">Unpopular</option>
            <option value="somewhat popular">Somewhat Popular</option>
            <option value="very popular">Very Popular</option>
            <option value="doesn't matter">Doesn't Matter</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-6 py-3 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {error && <p className="mt-6 text-center text-red-600">{error}</p>}
      {prediction && <p className="mt-6 text-center text-lg font-medium">Predicted Category: {prediction}</p>}
    </div>
  );
};

export default FoodPrediction;