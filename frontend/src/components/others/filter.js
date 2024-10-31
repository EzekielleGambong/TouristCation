import { useState } from "react";
import PropTypes from "prop-types";

function Location() {
  return <input type="text" className="w-full h-12 rounded-xl border-transparent focus:border-sky-500 focus:ring-0 bg-gray-100 font-normal ~text-xs/base" placeholder="Search for a location..." />;
}

function TravelPeriod() {
  return (
    <div className="flex flex-row h-12">
      <input type="date" className="w-full start-date rounded-l-xl border-transparent focus:border-sky-500 focus:ring-0 bg-gray-100 font-normal ~text-xs/base" required />
      <input type="date" className="w-full end-date rounded-r-xl border-transparent focus:border-sky-500 focus:ring-0 bg-gray-100 font-normal ~text-xs/base" required />
    </div>
  );
}

function NoOfTravellers() {
  const [noOfTravellers, setNoOfTravellers] = useState(1);
  const handleSubtract = () => {
    setNoOfTravellers((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  const handleAdd = () => {
    setNoOfTravellers((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex flex-row h-12">
      <button className="w-full rounded-l-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleSubtract}>
        -
      </button>
      <input type="text" className="w-full border-transparent focus:border-transparent text-center focus:ring-0 bg-gray-100 font-normal ~text-xs/base" value={noOfTravellers} readOnly required />
      <button className="w-full rounded-r-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleAdd}>
        +
      </button>
    </div>
  );
}

function NoOfRooms() {
  const [noOfRooms, setNoOfRooms] = useState(1);
  const handleSubtract = () => {
    setNoOfRooms((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  const handleAdd = () => {
    setNoOfRooms((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex flex-row h-12">
      <button className="w-full rounded-l-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleSubtract}>
        -
      </button>
      <input type="text" className="w-full border-transparent focus:border-transparent text-center focus:ring-0 bg-gray-100 font-normal ~text-xs/base" value={noOfRooms} readOnly required />
      <button className="w-full rounded-r-xl transition-all bg-gray-100 font-bold ~text-xs/base text-sky-500 p-4" onClick={handleAdd}>
        +
      </button>
    </div>
  );
}

function BudgetAccomodation() {
  return <input type="text" className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base" placeholder="Set your budget..." required />;
}

export default function Filter({ FilterOptions }) {
  const SearchFilter = ["Location", "Travel period", "No. of Travelers", "No. of Rooms", "Budget for Accomodation"];

  return (
    <div id="filter" className="flex flex-col rounded-xl border border-black bg-gray-300 p-4 gap-y-3">
      {FilterOptions.map((option, index) => (
        <label key={index} className="flex flex-col space-y-1">
          <span className="font-bold ~text-xs/base">{SearchFilter[option]}</span>

          {option === 0 && <Location />}
          {option === 1 && <TravelPeriod />}
          {option === 2 && <NoOfTravellers />}
          {option === 3 && <NoOfRooms />}
          {option === 4 && <BudgetAccomodation />}
        </label>
      ))}

      <button className="rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">Search</button>
    </div>
  );
}

Filter.propTypes = {
  FilterOptions: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};
