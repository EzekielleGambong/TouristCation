import PropTypes from "prop-types";

function Location() {
  return <input type="text" className="w-full h-12 rounded-xl border-transparent focus:border-sky-500 focus:ring-0 bg-gray-100 font-normal ~text-xs/base" placeholder="Search for a location..." />;
}

function CostPerNight() {
  return <input type="text" className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base" placeholder="Set cost per night..." />;
}

export default function Filter({ FilterOptions }) {
  const SearchFilter = ["Location", "Cost per night"];

  return (
    <div id="filter" className="flex flex-col h-fit rounded-xl border border-black bg-gray-300 p-4 gap-y-3">
      {FilterOptions.map((option, index) => (
        <label key={index} className="flex flex-col space-y-1">
          <span className="font-bold ~text-xs/base">{SearchFilter[option]}</span>

          {option === 0 && <Location />}
          {option === 1 && <CostPerNight />}
        </label>
      ))}

      <button className="rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">Search</button>
    </div>
  );
}

Filter.propTypes = {
  FilterOptions: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};
