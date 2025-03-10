import { useStorePlan } from "../hooks/useStore";
import { fetchProfile } from "../services/api"; 
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import Papa from "papaparse";
import foodDataCSV from "../pages/data.csv";
import PropTypes from "prop-types";
import shopDataCSV from "../pages/shops.csv"; 
function formatDate(data) {
  return new Date(data).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function AccommodationInformation({ settings }) {
  return (
    <div className="w-full flex flex-row space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="~w-5/8 fill-black">
        {settings.icon}
      </svg>
      <div className="flex flex-col">
        <p className="font-normal ~text-xs/base">{settings.title}</p>
        <p className="font-normal ~text-xs/base">{settings.type === "date" ? formatDate(settings.data) : settings.type === "money" ? `P${settings.data}` : settings.data}</p>
      </div>
    </div>
  );
}

AccommodationInformation.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node.isRequired,
  }).isRequired,
};

export default function ItineraryReview() {
  const { province, accommodation, stayPeriodFrom, stayPeriodTo, noOfTravellers, excessBudget, touristSpots = [], food = [] } = useStorePlan((state) => state);

  const [selectedShop, setSelectedShop] = useState(null);

  // Close when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "drawer-bg") {
      setSelectedShop(null);
    }
  };
  const [travelStyle, setTravelStyle] = useState("");

  // Extract coordinates from tourist spots
  const points = useMemo(() => {
    return (touristSpots || []).map((spot) => {
      const [lat, lng] = spot.locationCoordinates.split(",").map(Number);
      return { lat, lng };
    });
  }, [touristSpots]);
  

  // Compute map center as the average of all selected points
  const center = useMemo(() => {
    if (points.length === 0) return { lat: 16.326855, lng: 120.3625725 };

    const avgLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
    const avgLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;

    return { lat: avgLat, lng: avgLng };
  }, [points]);
  const accommodationInfo = [
    {
      type: "date",
      icon: (
        <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
      ),
      title: "Check In",
      data: stayPeriodFrom,
    },
    {
      type: "date",
      icon: (
        <path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
      ),
      title: "Check Out",
      data: stayPeriodTo,
    },
    {
      type: "number",
      icon: (
        <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z" />
      ),
      title: "Travelers",
      data: noOfTravellers,
    },
    {
      type: "money",
      icon: (
        <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
      ),
      title: "Excess Budget",
      data: excessBudget,
    },
  ];
  const options = useMemo(
    () => ({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyALxxaseN-mHW6PereNm-dNZl2pxAvnLfw",
      libraries: ["maps"],
      language: "en",
      region: "",
    }),
    []
  );

  const { isLoaded, loadError } = useJsApiLoader(options);
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds);
    setMap(map);
  }, [points]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  const [foodList, setFoodList] = useState([]);
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
  const parseCSVFiles = async () => {
    // Fetch and parse food CSV
    const fetchFoodCSV = fetch(foodDataCSV).then((response) => response.text());
    // Fetch and parse shop CSV
    const fetchShopCSV = fetch(shopDataCSV).then((response) => response.text());

    // Wait for both fetches to complete
    const [foodText, shopText] = await Promise.all([fetchFoodCSV, fetchShopCSV]);

    // Parse Food CSV
    Papa.parse(foodText, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const uniqueFood = [...new Map(result.data.map(item => [item["name_of_restaurant"], item])).values()];
        setFoodList(uniqueFood);
      },
    });

    // Parse Shop CSV
    Papa.parse(shopText, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const uniqueShops = [...new Map(result.data.map(item => [item["name_of_restaurant"], item])).values()];
        setShopList(uniqueShops);
      },
    });
  };

  parseCSVFiles();
}, []);


const shopPoints = useMemo(() => {
  return (shopList || [])
    .filter(shop => shop.coordination) // Might need to be shop.coordinates
    .map(shop => {
      const [lat, lng] = shop.coordination.split(",").map(Number);
      return { lat, lng };
    });
}, [shopList]);


const shopCenter = useMemo(() => {
  if (shopPoints.length === 0) return { lat: 16.326855, lng: 120.3625725 };

  const avgLat = shopPoints.reduce((sum, p) => sum + p.lat, 0) / shopPoints.length;
  const avgLng = shopPoints.reduce((sum, p) => sum + p.lng, 0) / shopPoints.length;

  return { lat: avgLat, lng: avgLng };
}, [shopPoints]);


useEffect(() => {
  console.log("🔍 Updated Food List:", foodList);
}, [foodList]);  // ✅ This will trigger whenever foodList updates


useEffect(() => {
  console.log("📍 Shop Points:", shopPoints);
}, [shopPoints]);

  
  if (loadError) return <div>Error loading Google Maps API</div>;

  return (
    <div className="w-full flex flex-col ~space-y-6/8">
      <section className="map-section">
        {isLoaded ? (
          <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount}>
            {(points || []).map((point, i) => (
  <MarkerF key={i} position={point} />
))}

          </GoogleMap>
        ) : (
          <div>Loading Map...</div>
        )}
      </section>
      <section className="flex flex-col ~space-y-1/2">
        <p className="w-full font-bold ~text-2xl/4xl text-sky-500">{province}</p>

        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-10 fill-black">
              <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
            </svg>
            <p className="font-bold ~text-xl/3xl">{accommodation.nameOfEstablishments}</p>
          </div>
          <p className="font-normal ~text-base/xl">{accommodation.address}</p>
        </div>

        <div className="w-fit grid grid-cols-2 place-items-center ~gap-x-2/4">
          {accommodationInfo.map((settings, index) => (
            <>
              <AccommodationInformation key={index} settings={settings} />
            </>
          ))}
        </div>
      </section>
      {/* Display selected tourist spots */}
      <section>
        <h2 className="text-xl font-bold">Selected Tourist Spots</h2>
        <ul>
          {(touristSpots || []).map((spot, index) => (
            <li key={index} className="p-2 bg-white rounded-lg shadow mt-2">
              <h3 className="font-bold">{spot.nameOfAttractions}</h3>
              <p>{spot.description}</p>
            </li>
          ))}
        </ul>

      </section>

      <section>
        <h2 className="text-xl font-bold">Selected Tourist Spots</h2>
        <ul>
          {(food || []).map((foodItem, index) => (
            <li key={index} className="p-2 bg-white rounded-lg shadow mt-2">
              <h3 className="font-bold">{foodItem.nameOfAttractions}</h3>
              <p>{foodItem.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shop-map-section">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Locations</h2>

  {/* Google Map Section */}
  {isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "8px" }}
      center={shopCenter}
      zoom={12}
    >
      {(shopPoints || []).map((point, i) => (
        <MarkerF key={i} position={point} />
      ))}
    </GoogleMap>
  ) : (
    <div className="text-gray-500 text-center">Loading Shop Map...</div>
  )}

  {/* Shop Details Section */}
  <section className="mt-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shopList.map((shop, index) => (
        <div 
          key={index} 
          className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setSelectedShop(shop)}
        >
          <h3 className="text-lg font-semibold text-gray-900">{shop.name_of_restaurant}</h3>
        </div>
      ))}
      
      {/* Collapsible Drawer */}
      {selectedShop && (
        <div 
          id="drawer-bg" 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto animate-fadeIn">
            <h3 className="text-xl font-bold">{selectedShop.name}</h3>
            <p className="mt-2">{selectedShop.description}</p>
            <p className="text-gray-500 mt-2 text-sm">
              <strong>Coordinates:</strong> {selectedShop.coordination}
            </p>
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" 
              onClick={() => setSelectedShop(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </section>
</section>


    </div>
  );
}

