import React, { useState } from 'react';
import axios from 'axios';

const TravelStylePrediction = () => {
    const [userInput, setUserInput] = useState({ typeOfAttractions: '', category: '' });
    const [prediction, setPrediction] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', [userInput]);
            setPrediction(response.data.predictions[0]);
        } catch (error) {
            console.error('Error making prediction:', error);
        }
    };

    return (
        <div>
            <h1>Travel Style Predictor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="typeOfAttractions"
                    placeholder="Type of Attractions"
                    value={userInput.typeOfAttractions}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={userInput.category}
                    onChange={handleInputChange}
                />
                <button type="submit">Predict</button>
            </form>
            {prediction && <p>Predicted Travel Style: {prediction}</p>}
        </div>
    );
};

export default TravelStylePrediction;