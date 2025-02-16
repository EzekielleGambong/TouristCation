import React, { useState } from 'react';
import axios from 'axios';

const MLPredictButton = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      // Example data - modify according to your model's requirements
      const data = [{
        typeOfAttractions: "Nature",
        category: "Adventure"
      }];

      const response = await axios.post('/api/predict', data);
      setPrediction(response.data.predictions[0]);
    } catch (err) {
      setError(err.message || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 flex flex-col items-start gap-2">
      <button
        onClick={handlePredict}
        disabled={loading}
        className="flex justify-center items-center rounded-full transition-all bg-blue-500 hover:bg-blue-700 py-2 px-4 gap-2"
      >
        <span className="text-sm font-bold text-white">
          {loading ? 'Getting Prediction...' : 'Get Travel Style Prediction'}
        </span>
        {!loading && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M12 16L6 10H18L12 16Z"/>
          </svg>
        )}
      </button>
      
      {prediction && (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-2">
          <p className="text-sm font-semibold text-gray-800">
            Recommended Travel Style: <span className="text-blue-500">{prediction}</span>
          </p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-500 rounded-lg p-2 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default MLPredictButton;
