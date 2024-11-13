import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useStorePlan } from "../hooks/useStore";

import PropTypes from "prop-types";

import Sort from "../components/others/sort";
import Filter from "../components/others/filter";
import View from "../components/others/view";
import CardGrid from "../components/cards/card_grid";
import Pagination from "../components/cards/pagination";
import Modal from "../components/modals/modal";

const provinceCityMap = {
  "La Union": ["Agoo", 
    "Aringay", 
    "Bacnotan",
    "Balaoan",
    "Bangar",
    "Bauang",
    "Caba",
    "Luna",
    "Naguilian",
    "Pugo",
    "Rosario",
    "San Fernando City",
    "San Juan",
    "Santo Tomas",
    "Sudipen",
    "Tubao"],
    
  "Ilocos Sur": ["", ""],
  "Ilocos Norte": ["", ""],
  "Pangasinan": ["", ""]
};
function SelectedAccommodation({ settings }) {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <div onClick={toggleModal} className="rounded-xl transition-all bg-white hover:bg-sky-500 hover:text-white p-3">
        <p className="font-bold ~text-sm/lg">{settings.price}</p>
        <p className="font-normal ~text-xs/base">P{settings.price} per night</p>
      </div>

      {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
    </>
  );
}


SelectedAccommodation.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.string.isRequired,

    nameOfEstablishments: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    
    decription: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,

    price: PropTypes.number.isRequired,

    budget_allocated: PropTypes.string,
  }).isRequired,
};

function getDaysOfTour(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInMs = end - start;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return Math.round(diffInDays);
}

function Plan() {
  const navigate = useNavigate();
  const {
    setStayPeriodFrom,
    setStayPeriodTo,
    setNoOfTravellers,
    setWholeBudget,
    setAccommodationBudget,
    setTouristSpotsBudget,
    setNoOfRooms,
    accommodation,
    stayPeriodFrom,
    stayPeriodTo,
    noOfTravellers,
    noOfRooms,
    wholeBudget,
  } = useStorePlan((state) => state);

  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    return newDate.toISOString().split("T")[0];
  };

  const handleSetAccommodation = (e) => {
    e.preventDefault();

    if (accommodation === "") {
      alert("Please select an accommodation");
      return;
    } else if (noOfTravellers === 0) {
      alert("No. of Travellers can't be 0");
      return;
    } else if (noOfRooms === 0) {
      alert("No. of Rooms can't be 0");
      return;
    }

    const daysOfTour = getDaysOfTour(stayPeriodFrom, stayPeriodTo);
    const accommodationBudget = accommodation.cost * daysOfTour * noOfRooms;

    if (accommodationBudget > wholeBudget) {
      alert("Budget is too low!");
      return;
    }

    setAccommodationBudget(accommodationBudget);
    setTouristSpotsBudget(wholeBudget - accommodationBudget);
    navigate("/accommodations/tourist-spots/");
  };

  const handleSubtractTravellers = () => {
    setNoOfTravellers(() => (Number(noOfTravellers) > 1 ? Number(noOfTravellers) - 1 : 1));
  };
  const handleAddTravellers = () => {
    setNoOfTravellers(() => Number(noOfTravellers) + 1);
  };

  const handleSubtractRooms = () => {
    setNoOfRooms(() => (Number(noOfRooms) > 1 ? Number(noOfRooms) - 1 : 1));
  };
  const handleAddRooms = () => {
    setNoOfRooms(() => Number(noOfRooms) + 1);
  };

  return (
    <form id="selected_accomomdation" onSubmit={handleSetAccommodation} className="flex flex-col rounded-xl border border-black bg-gray-300 p-4 gap-y-3">
      <div className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">Selected Accommodation</span>
        {accommodation !== "" && <SelectedAccommodation settings={accommodation} />}
      </div>

      <label className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">Stay period</span>
        <div className="flex flex-col">
          <input
            type="date"
            onChange={(e) => setStayPeriodFrom(e.target.value)}
            className="w-full h-12 start-date rounded-t-xl border-transparent focus:border-sky-500 focus:ring-0 bg-gray-100 font-normal ~text-xs/base"
            required
          />
          <input
            type="date"
            min={stayPeriodFrom ? addOneDay(stayPeriodFrom) : ""}
            onChange={(e) => setStayPeriodTo(e.target.value)}
            className="w-full h-12 end-date rounded-b-xl border-transparent focus:border-sky-500 focus:ring-0 bg-gray-100 font-normal ~text-xs/base"
            disabled={!stayPeriodFrom}
            required
          />
        </div>
      </label>

      <label className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">No. of Travelers</span>
        <div className="flex flex-row h-12">
          <button type="button" className="w-full rounded-l-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleSubtractTravellers}>
            -
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            onChange={(e) => setNoOfTravellers(e.target.value)}
            className="w-full border-transparent focus:border-transparent text-center focus:ring-0 bg-gray-100 font-normal ~text-xs/base"
            value={noOfTravellers}
            required
          />
          <button type="button" className="w-full rounded-r-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleAddTravellers}>
            +
          </button>
        </div>
      </label>

      <label className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">No. of Rooms</span>
        <div className="flex flex-row h-12">
          <button type="button" className="w-full rounded-l-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleSubtractRooms}>
            -
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            onChange={(e) => setNoOfRooms(e.target.value)}
            className="w-full border-transparent focus:border-transparent text-center focus:ring-0 bg-gray-100 font-normal ~text-xs/base"
            value={noOfRooms}
            required
          />
          <button type="button" className="w-full rounded-r-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleAddRooms}>
            +
          </button>
        </div>
      </label>

      <label className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">Whole Budget for Entire Tour</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
          onChange={(e) => setWholeBudget(e.target.value)}
          className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base"
          placeholder="Set your whole budget..."
          required
        />
      </label>

      <button type="submit" className="rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
        Set Accommodation
      </button>
    </form>
  );
}

function Accommodations() {
  const settings = [
    { value: "sort_1", text: "Sort 1" },
    { value: "sort_2", text: "Sort 2" },
    { value: "sort_3", text: "Sort 3" },
  ];
  
  const [province, setProvince] = useState('');
  const [cities, setCities] = useState([]);

  const [accommodations, setAccommodations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [city, setCity] = useState('');  
  const [pax, setPax] = useState('');  

  useEffect(() => {
    setCities(provinceCityMap[province] || []);
    setCity(''); 
  }, [province]);

  const fetchFilteredAccommodations = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(province && { province }),
        ...(city && { city }),
        ...(pax && { pax: Number(pax) }) 
      }).toString();

      const response = await fetch(`http://localhost:8080/accommodation?${queryParams}`);
      const data = await response.json();
      setAccommodations(data);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accommodations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <section className="basis-1/3 w-full ~space-y-4/8">
        <Sort settings={[{ value: "sort_1", text: "Sort 1" }]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:sticky top-4 ~gap-2/3">
          <Filter FilterOptions={[0, 1]} />
          <Plan />
         
          <label className="flex flex-col space-y-1">
            <span className="font-bold ~text-xs/base">Province</span>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full h-12 rounded-xl border-transparent bg-gray-100"
            >
              <option value="">Select a province</option>
              {Object.keys(provinceCityMap).map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </label>

          
          <label className="flex flex-col space-y-1">
            <span className="font-bold ~text-xs/base">City</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 rounded-xl border-transparent bg-gray-100"
              disabled={!province} 
            >
              <option value="">Select a city</option>
              {cities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </label>

          
          <label className="flex flex-col space-y-1">
            <span className="font-bold ~text-xs/base">No. of People per Room</span>
            <input
              type="number"
              value={pax}
              onChange={(e) => setPax(e.target.value)}
              className="w-full h-12 rounded-xl border-transparent bg-gray-100"
              placeholder="Enter pax per room"
            />
          </label>

          <button onClick={fetchFilteredAccommodations} className="mt-4 rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase font-bold text-white py-2">
            Search
          </button>
        </div>
      </section>

      <section className="w-full ~space-y-4/8">
        <div className="h-fit lg:h-16 flex flex-row items-center">
          <p className="w-full font-bold ~text-2xl/4xl text-sky-500">{}</p>
          <View />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((settings, index) => (
              <CardGrid key={index} settings={settings} />
            ))
          ) : (
            <p>No accommodations found. Please adjust the filters and try again.</p>
          )}
        </div>
        <Pagination
          totalItems={accommodations.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}

export default Accommodations;