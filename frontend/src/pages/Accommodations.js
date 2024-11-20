import { useState, useEffect } from "react";
import { useStorePlan } from "../hooks/useStore";
import touristSpots from "./file.json";

import PropTypes from "prop-types";
import landingimg from '../images/6.png';
import Sort from "../components/others/sort";
import View from "../components/others/view";
import CardGrid from "../components/cards/card_grid";
import Pagination from "../components/cards/pagination";
import Modal from "../components/modals/modal";
import ModalPlan from "../components/modals/modal_plan";

function SelectedAccommodation({ settings }) {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <div onClick={toggleModal} className="flex flex-col space-y-2 rounded-xl transition-all bg-white hover:bg-sky-500 hover:text-white p-3">
        <div className="flex flex-col">
          <p className="line-clamp-1 font-bold ~text-sm/lg">{settings.nameOfEstablishments}</p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            Room: <span className="font-normal">{settings.room}</span>
          </p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            Maximum Occupancy: <span className="font-normal">{settings.pax}</span>
          </p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            Contact: <span className="font-normal">{settings.contactNumber}</span>
          </p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            cords: <span className="font-normal">{settings.coordinates}</span>
          </p>
        </div>

        <p className="font-normal ~text-xs/base">P{settings.price} per night</p>
      </div>

      {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
    </>
  );
}

SelectedAccommodation.propTypes = {
  settings: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    establishmentId: PropTypes.string,
    nameOfEstablishments: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    aeStatus: PropTypes.string,
    aeType: PropTypes.string,
    subCategory: PropTypes.string,
    contactNumber: PropTypes.string.isRequired,
    facebookPage: PropTypes.string,
    room: PropTypes.string.isRequired,
    pax: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    googleTravel: PropTypes.string,
    coordinates: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
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
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const {
    setStayPeriodFrom,
    setStayPeriodTo,
    setNoOfTravellers,
    setWholeBudget,
    setBudgetCap,
    setAccommodationBudget,
    setTouristSpotsBudget,
    accommodation,
    stayPeriodFrom,
    stayPeriodTo,
    noOfTravellers,
    wholeBudget,
    budgetCap,
    touristSpotsBudget,
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
    }

    const daysOfTour = getDaysOfTour(stayPeriodFrom, stayPeriodTo);
    const noOfRooms = Math.ceil(noOfTravellers / accommodation.pax);
    const accommodationBudget = accommodation.price * daysOfTour * noOfRooms;

    if (accommodationBudget > wholeBudget) {
      alert("Budget is too low!");
      return;
    }

    setAccommodationBudget(accommodationBudget);
    setTouristSpotsBudget(wholeBudget - accommodationBudget);
    toggleModal();
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
            min={new Date().toISOString().split('T')[0]} // Set today as the minimum date
          />
          <input
            type="date"
            min={stayPeriodFrom ? addOneDay(stayPeriodFrom) : ""} // Ensure Stay To is after Stay From
            onChange={(e) => setStayPeriodTo(e.target.value)}
            className="w-full h-12 end-date rounded-b-xl border-transparent focus:border-sky-500 focus:ring-0 bg-gray-100 font-normal ~text-xs/base"
            disabled={!stayPeriodFrom}
            required
          />
        </div>
      </label>

      <label className="flex flex-col space-y-1">
        <span className="font-bold ~text-xs/base">No. of Travelers</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
          onChange={(e) => setNoOfTravellers(e.target.value)}
          className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base"
          placeholder="Set no. of travelers..."
          value={noOfTravellers}
          required
        />
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
          placeholder="Set whole budget..."
          required
        />
      </label>

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
        Set Accommodation
      </button>

      {isModal && <ModalPlan isOpen={isModal} onClose={toggleModal} touristSpotsBudget={touristSpotsBudget} budgetCap={budgetCap} accommodation={accommodation} touristSpots={touristSpots} />}
    </form>
  );
}

function Accommodations() {
  const settings = [
    { value: "sort_1", text: "Sort Data" },
    { value: "sort_low_to_high", text: "Price: Low to High" }, 
    { value: "sort_high_to_low", text: "Price: High to Low" }, 
  ];

  const provinceCityMap = {
    "La Union": ["All", "Agoo", "Aringay", "Bacnotan", "Balaoan", "Bangar", "Bauang", "Caba", "Luna", "Naguilian", "Pugo", "Rosario", "San Fernando City", "San Juan", "Santo Tomas", "Sudipen", "Tubao"],
    "Ilocos Sur": ["All", "Bantay",
      "Cabugao",
      "Candon City",
      "Caoayan",
      "Cervantes",
      "Magsingal",
      "San Esteban",
      "San Vicente",
      "Santa Catalina",
      "Santa Maria",
      "Santiago",
      "Santo Domingo",
      "Tagudin",
      "Vigan City"],
    "Ilocos Norte": ["All", "Adams",
      "Badoc",
      "Bangui",
      "Batac City",
      "Currimao",
      "Pagudpud",
      "Paoay",
      "Pasuquin",
      "San Nicolas",
      'Sarrat'],
    "Pangasinan": ["All", "Agno",
      "Alaminos City",
      "Alcala",
      "Anda",
      "Bani",
      "Binmaley",
      "Bolinao",
      "Bugallon",
      "Burgos",
      "Calasiao",
      "Dagupan City",
      "Dasol",
      "Labrador",
      "Lingayen",
      "Magtaking",
      "Manaoag",
      "Mangaldan",
      "Mangatarem",
      "San Carlos City",
      "San Fabian",
      "Sual",
      "Tayug",
      "Urdaneta City",
      "Villasis"]
  };
  const { setProvince, province } = useStorePlan((state) => state);
  const [cities, setCities] = useState([]);

  const [accommodations, setAccommodations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortOption, setSortOption] = useState(""); // New state for sorting
  const [selectedCity, setSelectedCity] = useState("");
  const [city, setCity] = useState("");
  const [pax, setPax] = useState("");

  useEffect(() => {
    setCities(provinceCityMap[province] || []);
    setCity("");
  }, [province]);

  const fetchFilteredAccommodations = async () => {
    try {
      if (province === "") {
        setAccommodations([]);
        alert("Please select a province!");
        return;
      }

      const queryParams = new URLSearchParams({
        ...(province && { province }),
        ...(city && { city }),
        ...(pax && { pax: Number(pax) }),
      }).toString();

      const response = await fetch(`http://localhost:8080/accommodation?${queryParams}`);
      const data = await response.json();
      console.log("Fetched data:", queryParams);
      setSelectedCity(city === "" ? province : city);
      setAccommodations(data);
      setSortOption("")
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSortChange = (option) => {
    setSortOption(option);
  };
  useEffect(() => {
    if (sortOption === "sort_low_to_high") {
      setAccommodations((prevAccommodations) =>
        [...prevAccommodations].sort((a, b) => a.price - b.price)
      );
    } else if (sortOption === "sort_high_to_low") {
      setAccommodations((prevAccommodations) =>
        [...prevAccommodations].sort((a, b) => b.price - a.price)
      );
    } 
  }, [sortOption]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accommodations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <section className="basis-1/3 w-full ~space-y-4/8">
        <Sort settings={settings} onSortChange={handleSortChange} /> {/* Pass the handler to Sort */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:sticky top-4 ~gap-2/3">
          <div id="filter" className="flex flex-col h-fit rounded-xl border border-black bg-gray-300 p-4 gap-y-3">
            <label className="flex flex-col space-y-1">
              <span className="font-bold ~text-xs/base">Province</span>

              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base"
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
                className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base"
                disabled={!province}
              >
                <option value="" className="font-bold">
                  Select a City
                </option>
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
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                onChange={(e) => setPax(e.target.value)}
                className="w-full h-12 rounded-xl border-transparent bg-gray-100 focus:border-sky-500 focus:ring-0 font-normal ~text-xs/base"
                placeholder="Set no. of people..."
                value={pax}
                required
              />
            </label>

            <button type="button" onClick={fetchFilteredAccommodations} className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
              Search
            </button>
          </div>

          <Plan />
        </div>
      </section>

      <section className="w-full ~space-y-4/8">
        <div className="h-fit lg:h-16 flex flex-row items-center">
          <p className="w-full font-bold ~text-2xl/4xl text-sky-500">{selectedCity}</p>
          <View />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItems.length > 0 ? currentItems.map((settings) => <CardGrid key={settings._id} settings={settings} />) : <p>No accommodations found. Please adjust the filters and try again.</p>}
        </div>

        {accommodations.length !== 0 && <Pagination totalItems={accommodations.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />}
      </section>
    </>
  );
}

export default Accommodations;
