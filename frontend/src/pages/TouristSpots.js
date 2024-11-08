import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStorePlan } from "../hooks/useStore";

import PropTypes from "prop-types";

import Sort from "../components/others/sort";
import Filter from "../components/others/filter";
import View from "../components/others/view";
import CardGrid from "../components/cards/card_grid";
import Modal from "../components/modals/modal";

function SelectedTouristSpots({ settings }) {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <button type="button" onClick={toggleModal} className="rounded-xl transition-all bg-white hover:bg-sky-500 font-medium text-left ~text-xs/base hover:text-white px-3 py-[0.625rem]">
        {settings.destination}
      </button>

      {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
    </>
  );
}

SelectedTouristSpots.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,

    destination: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    cost: PropTypes.number.isRequired,
    budget_allocated: PropTypes.string,

    rating: PropTypes.number,
  }).isRequired,
};

function Plan() {
  const navigate = useNavigate();
  const { setBudgetCap, touristSpotsBudget, touristSpots, budgetCap } = useStorePlan((state) => state);

  const handleSetTouristSpot = (e) => {
    e.preventDefault();

    if (touristSpots.length === 0) {
      alert("Please select at least one or more tourist spots you wanted to visit.");
      return;
    } else if (budgetCap > touristSpotsBudget) {
      alert("Budget cap can't be more than the whole budget");
      return;
    }

    navigate("/accommodations/tourist-spots/itinerary-review/");
  };

  return (
    <form id="selected_tourist_spots" onSubmit={handleSetTouristSpot} className="flex flex-col rounded-xl border border-black bg-gray-300 p-4 gap-y-3">
      <label className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">Tourist Spots Budget</span>
        <input type="text" className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:ring-0 font-normal ~text-xs/base" value={touristSpotsBudget} readOnly />
      </label>

      <div className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">Selected Tourist Spots</span>
        <div className="flex flex-col space-y-1">
          {touristSpots.map((settings, index) => (
            <SelectedTouristSpots key={index} settings={settings} />
          ))}
        </div>
      </div>

      <label className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">Budget Cap for Tourist Spot</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
          onChange={(e) => setBudgetCap(e.target.value)}
          className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base"
          placeholder="Set your budget cap..."
          required
        />
      </label>

      <button type="submit" className="rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
        Budget
      </button>
    </form>
  );
}

export default function TouristSpots() {
  const sortSettings = [
    {
      value: "sort_1",
      text: "Sort 1",
    },
    {
      value: "sort_2",
      text: "Sort 2",
    },
    {
      value: "sort_3",
      text: "Sort 3",
    },
  ];
  const { province, setTouristSpotsBudget } = useStorePlan((state) => state);

  const cardSettings = [
    {
      type: "tourist_spot",
      id: 1,
      destination: "Tourist Spot 1",
      address: "Address of Tourist Spot 1",
      contact: "Contact of Tourist Spot 1",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: 0,
      rating: 0,
    },
    {
      type: "tourist_spot",
      id: 2,
      destination: "Tourist Spot 2",
      address: "Address of Tourist Spot 2",
      contact: "Contact of Tourist Spot 2",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: 200,
      rating: 0,
    },
    {
      type: "tourist_spot",
      id: 3,
      destination: "Tourist Spot 3",
      address: "Address of Tourist Spot 3",
      contact: "Contact of Tourist Spot 3",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: 50,
      rating: 0,
    },
    {
      type: "tourist_spot",
      id: 4,
      destination: "Tourist Spot 4",
      address: "Address of Tourist Spot 4",
      contact: "Contact of Tourist Spot 4",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: 120,
      rating: 0,
    },
  ];

  return (
    <>
      <section className="basis-1/3 w-full ~space-y-4/8">
        <Sort settings={sortSettings} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:sticky top-4 ~gap-2/3">
          <Filter FilterOptions={[0]} />
          <Plan />
        </div>
      </section>

      <section className="w-full ~space-y-4/8">
        <div className="h-fit lg:h-16 flex flex-row items-center">
          <p className="w-full font-bold ~text-2xl/4xl text-sky-500">{province}</p>
          <View />
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
          {cardSettings.map((settings, index) => (
            <CardGrid key={index} settings={settings} />
          ))}
        </div>
      </section>
    </>
  );
}
