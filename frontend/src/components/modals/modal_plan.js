import { useState } from "react";
import { useStorePlan } from "../../hooks/useStore";
import { Knapsack } from "../../hooks/useKnapsack_2";
import { useNavigate } from "react-router-dom";

export default function ModalPlan({ isOpen, onClose, touristSpotsBudget, budgetCap, accommodation, touristSpots }) {
  const { setTouristSpots, setExcessBudget } = useStorePlan((state) => state);

  const [touristTypes, setTouristTypes] = useState([
    { type: "Cultural Tourism", rating: 0, count: 1 },
    { type: "Industrial Tourism", rating: 0, count: 3 },
    { type: "MICE and Events Tourism", rating: 0, count: 3 },
    { type: "Nature Tourism", rating: 0, count: 3 },
    { type: "Education", rating: 0, count: 3 },
    { type: "Leisure and Recreation", rating: 0, count: 3 },
  ]);

  const [hover, setHover] = useState(Array(touristTypes.length).fill(0));
  const navigate = useNavigate();

  const handleRating = (index, love) => {
    const updatedSpots = touristTypes.map((spot, i) => (i === index ? { ...spot, rating: love } : spot));
    setTouristTypes(updatedSpots);
  };
  const handleHover = (index, love) => {
    const newHover = [...hover];
    newHover[index] = love;
    setHover(newHover);
  };
  const resetRating = (index) => {
    const updatedSpots = touristTypes.map((spot, i) => (i === index ? { ...spot, rating: 0, count: 1 } : spot));
    setTouristTypes(updatedSpots);
  };

  const getKnapsack = () => {
    const allRatingsZero = touristTypes.every((type) => type.rating === 0);
    if (allRatingsZero) {
      alert("Please set a rating for at least one type of tourist spot before proceeding.");
      return; // Stop the function if all ratings are 0
    }

    let result = Knapsack(touristSpotsBudget, budgetCap, accommodation, touristTypes, touristSpots);

    setTouristSpots(result.settings);
    setExcessBudget(result.excessBudget);
    navigate("/itinerary-review/");
  };

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center p-4">
          <div className="relative transform overflow-hidden sm:w-full sm:max-w-2xl shadow-xl transition-all rounded-lg bg-white text-left sm:my-8">
            <div className="flex flex-col rounded-xl bg-gray-200">
              <div className="relative">
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex flex-row items-center gap-2 rounded-xl bg-yellow-600 p-3 text-white">
                    <p className="font-normal ~text-xs/base">This generates nearest tourist spots to your selected accommodation.</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold ~text-base/xl">Types of Tourist Spots</p>
                    <div className="grid grid-cols-2 gap-x-1 gap-y-3">
                      {touristTypes.map((tourist, index) => (
                        <div key={index} className="flex flex-col">
                          <p className="line-clamp-1 font-normal ~text-sm/lg">{tourist.type}:</p>
                          <div className="flex flex-row">
                            {[1, 2, 3, 4, 5].map((love) => (
                              <span
                                key={love}
                                className={`cursor-pointer transition-all ~text-lg/2xl ${love <= (hover[index] || tourist.rating) ? "fill-rose-500" : "fill-gray-400"}`}
                                onClick={() => handleRating(index, love)}
                                onMouseEnter={() => handleHover(index, love)}
                                onMouseLeave={() => handleHover(index, 0)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-4">
                                  <path d="M480-142.33q-12 0-24.17-4.34Q443.67-151 434.67-160l-58.34-53.67q-118-109-207.16-210.5Q80-525.67 80-640q0-91.33 61.33-152.67 61.34-61.33 152-61.33Q345-854 394-830.17q49 23.84 86 74.17 40.33-50.33 87.33-74.17 47-23.83 99.34-23.83 90.66 0 152 61.33Q880-731.33 880-640q0 114.33-89 216T583.33-213.33l-58 53.33q-9 9-21.16 13.33-12.17 4.34-24.17 4.34Z" />
                                </svg>
                              </span>
                            ))}
                            {tourist.rating > 0 && (
                              <button onClick={() => resetRating(index)} title="Reset heart" className="rounded-xl transition-all bg-sky-500 hover:bg-sky-700 text-xs fill-white ml-2 px-1 py-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-3">
                                  <path d="M481-126q-12.67 0-24.5-5t-20.83-13.67Q323.33-252 253.67-323.5 184-395 145.5-446.5t-52-90.83Q80-576.67 80-620q0-92 64-156t156-64q66 0 117 22.5t37 70.5l-41.67 144.67q-5 16 5.17 29.16Q427.67-560 444.33-560h76.34l-32 278.67q-1 8 6.5 9t9.5-6l84-278.34q5.33-16-5-29.66-10.34-13.67-27-13.67H480l62.33-186.33Q553.33-820 588-830t72-10q92 0 156 64t64 156q0 42.67-14.33 83-14.34 40.33-53.17 92.67-38.83 52.33-107.67 123.5Q636-249.67 526.67-144.67q-9 8.67-21 13.67T481-126Z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row gap-3">
                    <button type="button" onClick={onClose} className="w-full rounded-xl transition-all bg-rose-500 hover:bg-rose-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
                      Cancel
                    </button>

                    <button type="button" onClick={getKnapsack} className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
                      Generate Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
