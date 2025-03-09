import { useState, useEffect } from "react";
import { useStorePlan } from "../../hooks/useStore";
import { Knapsack } from "../../hooks/useKnapsack_2";
import { useNavigate } from "react-router-dom";
import { fetchProfile, fetchAttractionsByTravelStyle } from "../../services/api";
import Papa from "papaparse"; // CSV parser
import foodDataCSV from "./data.csv"; // Import CSV file

export default function ModalPlan({ isOpen, onClose, touristSpotsBudget, budgetCap, accommodation, touristSpots }) {
  const { province, setTouristSpots } = useStorePlan((state) => state);
  const [travelStyle, setTravelStyle] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]); 
  const [foodPrediction, setFoodPrediction] = useState("");
  const [filteredFood, setFilteredFood] = useState([]); // State for food recommendations from CSV
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchProfile();
        setTravelStyle(response.data.travelStylePrediction);
        setFoodPrediction(response.data.foodPrediction); // Store user's food prediction

        if (response.data.travelStylePrediction) {
          const attractionsResponse = await fetchAttractionsByTravelStyle(response.data.travelStylePrediction);
          setAttractions(attractionsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const parseCSV = async () => {
      const response = await fetch(foodDataCSV);
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const filtered = result.data.filter((item) => item.category === foodPrediction);
          setFilteredFood(filtered);
        },
      });
    };

    if (foodPrediction) {
      parseCSV();
    }
  }, [foodPrediction]);

  const toggleSelection = (item, type) => {
    if (type === "attraction") {
      setSelectedAttractions((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else if (type === "food") {
      setSelectedFood((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    }
  };
  

  // In modal_plan.js
const getKnapsack = () => {
  console.log("🔍 Selected food before setting:", selectedFood); // Log selected food
  setTouristSpots(selectedAttractions);
  setSelectedFood(selectedFood); // Store the entire food objects
  navigate("/itinerary-review/");
};



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
  
      {/* Modal Content */}
      <div className="relative w-full md:w-3/5 max-w-3xl bg-white rounded-lg shadow-lg p-6 z-10 flex flex-col max-h-[90vh]">
        <div className="bg-yellow-600 p-3 text-white rounded-xl">
          <p>This generates tourist spots and food recommendations.</p>
        </div>
  
        <div className="overflow-y-auto flex-grow p-2">
          {/* Tourist Spots */}
          <div>
            <p className="font-bold text-lg">Types of Tourist Spots</p>
            {travelStyle && (
              <p className="text-gray-700">
                Preferred Travel Style: <span className="font-semibold">{travelStyle}</span>
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              {attractions.length > 0 ? (
                attractions.map((attraction) => (
                  <div
                    key={attraction._id}
                    className={`p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition ${
                      selectedAttractions.includes(attraction) ? "border-2 border-green-500" : ""
                    }`}
                    onClick={() => toggleSelection(attraction, "attraction")}
                  >
                    <h3 className="font-bold">{attraction.nameOfAttractions}</h3>
                    <p className="text-sm">{attraction.description}</p>
                  </div>
                ))
              ) : (
                <p>No attractions found.</p>
              )}
            </div>
          </div>
  
          {/* Food Recommendations */}
          <div className="mt-6">
            <p className="font-bold text-lg">Food Recommendations</p>
            {foodPrediction && (
              <p className="text-gray-700">
                Food Preference: <span className="font-semibold">{foodPrediction}</span>
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              {filteredFood.length > 0 ? (
                filteredFood.map((food, index) => (
                  <div
                    key={index}
                    className={`p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition ${
                      selectedFood.includes(food) ? "border-2 border-green-500" : ""
                    }`}
                    onClick={() => toggleSelection(food, "food")}
                  >
                    <h3 className="font-bold">{food.name_of_restaurant}</h3>
                    <p className="text-sm">{food.description}</p>
                    <p className="text-sm">Category: {food.category}</p>
                  </div>
                ))
              ) : (
                <p>No matching food recommendations found.</p>
              )}
            </div>
          </div>
        </div>
  
        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="w-full bg-rose-500 hover:bg-rose-700 text-white py-2 rounded-xl">
            Cancel
          </button>
          <button
            onClick={getKnapsack}
            className="w-full bg-sky-500 hover:bg-sky-700 text-white py-2 rounded-xl"
            disabled={selectedAttractions.length === 0}
          >
            Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
  
}
