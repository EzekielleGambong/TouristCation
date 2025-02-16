import React, { useState } from 'react';
import axios from 'axios';

const TravelStylePrediction = () => {
    const [userInput, setUserInput] = useState({ typeOfAttractions: '', category: '' });
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        try {
          const response = await axios.post('http://localhost:5000/predict', [userInput]);
          setPrediction(response.data.predictions[0]);
        } catch (error) {
          console.error('Error making prediction:', error);
          setError('Failed to make prediction. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

    

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Travel Style Predictor</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium">What type of attractions do you prefer?</label>
          <select
            name="typeOfAttractions"
            value={userInput.typeOfAttractions}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Cultural Tourism">Cultural Tourism</option>
            <option value="Industrial Tourism">Industrial Tourism</option>
            <option value="Education Tourism">Education Tourism</option>
            <option value="Leisure and Recreation">Leisure and Recreation</option>
            <option value="MICE and Events Tourism">MICE and Events Tourism</option>
            <option value="Nature-focused">Nature Tourism</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">What kind of activities do you enjoy most while traveling?</label>
          <select
            name="category"
            value={userInput.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Historic Monument">Historic Monument</option>
            <option value="Religious Site">Religious Site</option>
            <option value="Museum">Museum</option>
            <option value="Industrial Facilities">Industrial Facilities</option>
            <option value="Structures and Buildings">Structures and Buildings</option>
            <option value="Leisure-land/Theme Parks">Leisure-land/Theme Parks</option>
            <option value="Unique Cultural Heritage">Unique Cultural Heritage</option>
            <option value="Parks">Parks</option>
            <option value="Mountains / Hills / Highlands">Mountains / Hills / Highlands</option>
            <option value="Coastal Landscape and Seascape">Coastal Landscape and Seascape</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-6 py-3 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
      </form>

      {error && <p className="mt-6 text-center text-red-600">{error}</p>}
      {prediction && <p className="mt-6 text-center text-lg font-medium">Predicted Travel Style: {prediction}</p>}
    </div>
        
    );
};

export default TravelStylePrediction;