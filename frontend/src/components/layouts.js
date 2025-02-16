import React from 'react';
import TravelStylePrediction from './TravelStylePrediction';
import FoodCategoryPrediction from './FoodPrediction';
import ShopCategorization from './Shops';
const Predictions = () => {
    return (
        <div>
            <TravelStylePrediction />
            <FoodCategoryPrediction />
            <ShopCategorization />
        </div>
    );
};

export default Predictions;
