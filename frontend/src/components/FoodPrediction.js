import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPrediction = () => {
  // Initialize state for userInput
  const [userInput, setUserInput] = useState({
    ambiance: "",
    popularity: "",
    average_price_range: "",
  });

  const [foodPrediction, setFoodPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);  // Profile state to hold fetched profile data

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // Validate fields before sending to backend
    if (!userInput.ambiance || !userInput.popularity) {
      alert('Please fill in all required fields.');
      return;
    }

    // Make sure to include the foodPrediction here in the updated profile
    const updatedProfile = {
      ...profile,  // Use the fetched profile data
      ambiance: userInput.ambiance,
      popularity: userInput.popularity,
      average_price_range: Number(userInput.average_price_range),
      foodPrediction: foodPrediction,  // Add foodPrediction to the updated profile
    };

    // Log the updated profile to check the structure
    console.log("Updated Profile Data: ", updatedProfile);
    
    try {
      const { data } = await fetchProfile();
    setProfile(data);
    // First, make the prediction request
    const response = await axios.post("https://backendalgo-ac230233e942.herokuapp.com/predict_food", userInput);
    console.log("Received response:", response.data);
    const prediction = response.data.predicted_category;  // Store the prediction

    // Update the profile with the prediction
    const updatedProfile = {
      ...profile,  // Use the fetched profile data
      ambiance: userInput.ambiance,
      popularity: userInput.popularity,
      average_price_range: Number(userInput.average_price_range),
      foodPrediction: prediction,  // Add foodPrediction to the updated profile
    };

    console.log("Updated Profile Data: ", updatedProfile);  // Check the profile data
    
    // Now, send the updated profile to the backend
    await updateProfile(updatedProfile);  // Send updated profile to the backend

    // Update the state with the prediction
    setFoodPrediction(prediction);  // Set food prediction for display
    navigate(profile.role === "admin" ? "/admin" : "/page/home");

  } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Profile on Mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile({
          ...data,
          preferences:
            data.preferences || {
              theme: "Light",
              notifications: false,
              language: "English",
            },
        });
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the profile.");
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Travel Style Predictor
      </h1>

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
            className={`px-6 py-3 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <p className="mt-6 text-center text-red-600">{error}</p>}

      {/* Prediction Output */}
      {foodPrediction && (
        <p className="mt-6 text-center text-lg font-medium">
          Predicted Travel Style: {foodPrediction}
        </p>
      )}
    </div>
  );
};

export default FoodPrediction;
