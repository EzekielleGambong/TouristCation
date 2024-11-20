import { useState, useEffect } from "react";
import { useStorePlan } from "../../hooks/useStore";

import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Accommodation({ settings, onClose }) {
  const { setAccommodation } = useStorePlan((state) => state);
  const [latitude, longitude] = settings.coordinates.split(", ").map(Number);

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center p-4">
          <div className="relative transform overflow-hidden sm:w-full sm:max-w-2xl shadow-xl transition-all rounded-lg bg-white text-left sm:my-8">
            <div className="flex flex-col rounded-xl bg-gray-200">
              <div className="relative">
                <LazyLoadImage src={settings.link} alt={settings.city} className="h-full aspect-[5/3] object-cover object-center" />

                <button className="absolute top-3 right-3 w-7 h-7 rounded-full transition-all bg-sky-500 hover:bg-sky-700 fill-white p-1" onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col space-y-2 p-6">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <p className="font-bold ~text-lg/2xl">{settings.nameOfEstablishments}</p>
                    <a href={`https://www.google.com/maps/place/${latitude},${longitude}`} rel="noreferrer noopener" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-8 transition-all fill-sky-500 hover:fill-sky-700">
                        <path d="M331.67-310.67 541-374q16-5.33 27.5-16.83 11.5-11.5 16.83-27.5l63.34-209.34q3-9.66-4.17-16.83-7.17-7.17-16.83-4.17l-209.34 63.34q-16 5.33-27.5 16.83Q379.33-557 374-541l-63.33 209.33q-3 9.67 4.16 16.84 7.17 7.16 16.84 4.16ZM480-433.33q-19.67 0-33.17-13.5T433.33-480q0-19.67 13.5-33.17t33.17-13.5q19.67 0 33.17 13.5t13.5 33.17q0 19.67-13.5 33.17T480-433.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Z" />
                      </svg>
                    </a>
                  </div>

                  <p className="font-bold ~text-xs/base">
                    Address: <span className="font-normal">{settings.address}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Room: <span className="font-normal">{settings.room}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Maximum Occupancy: <span className="font-normal">{settings.pax}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Contact: <span className="font-normal">{settings.contactNumber}</span>
                  </p>
                </div>

                <p className="font-normal ~text-xs/base">{settings.description}</p>
                <p className="text-center font-medium ~text-lg/2xl">P{settings.price} per night</p>

                <button
                  type="button"
                  className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4"
                  onClick={() => {
                    setAccommodation(settings);
                    onClose();
                  }}
                >
                  Set Accommodation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Accommodation.propTypes = {
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

function TouristSpot({ settings, onClose }) {
  const { setTouristSpots, touristSpots } = useStorePlan((state) => state);

  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const matchedSpot = touristSpots.find((spot) => spot.id === settings.id);

    if (matchedSpot) {
      setRating(matchedSpot.rating);
    }
  }, [settings.id, touristSpots]);

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center p-4">
          <div className="relative transform overflow-hidden sm:w-full sm:max-w-2xl shadow-xl transition-all rounded-lg bg-white text-left sm:my-8">
            <div className="flex flex-col rounded-xl bg-gray-200">
              <div className="relative">
                <LazyLoadImage src={settings.link} width="800" alt="sample" className="h-full aspect-[5/3] object-center" />
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full transition-all bg-sky-500 hover:bg-sky-700 fill-white p-1" onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-2 p-6">
                <p className="font-bold ~text-lg/2xl">{settings.destination}</p>
                <p className="font-bold ~text-xs/base">
                  Address: <span className="font-normal">{settings.address}</span>
                </p>
                <p className="font-bold ~text-xs/base">
                  Contact: <span className="font-normal">{settings.contact}</span>
                </p>
                <p className="font-normal ~text-xs/base">{settings.description}</p>

                <p className="font-bold ~text-xs/base">
                  Cost: <span className="font-normal">{settings.cost}</span>
                </p>

                <div className="flex place-content-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-3xl ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"}`}
                      onClick={() => {
                        const updatedStar = { ...settings, rating: star };
                        setTouristSpots(updatedStar);
                        onClose();
                      }}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IteneraryTouristSpot({ settings, onClose }) {
  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center p-4">
          <div className="relative transform overflow-hidden sm:w-full sm:max-w-2xl shadow-xl transition-all rounded-lg bg-white text-left sm:my-8">
            <div className="flex flex-col rounded-xl bg-gray-200">
              <div className="relative">
                <LazyLoadImage src={settings.link} width="800" alt="sample" className="h-full aspect-[5/3] object-center bg-gray-400" />
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full transition-all bg-sky-500 hover:bg-sky-700 fill-white p-1" onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-2 p-6">
                <p className="font-bold ~text-lg/2xl">{settings.nameOfAttraction}</p>

                <div className="flex flex-col">
                  <p className="font-bold ~text-xs/base">
                    Distance: <span className="font-normal">{settings.distance} km</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Type of Attraction: <span className="font-normal">{settings.typeOfAttraction}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Address: <span className="font-normal">{settings.address}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Contact: <span className="font-normal">{settings.contact}</span>
                  </p>
                </div>

                <p className="font-normal ~text-xs/base">{settings.briefDescription}</p>

                <div className="flex flex-col">
                  <p className="font-bold ~text-xs/base">
                    Entrance Fee: <span className="font-normal">P{settings.entranceFee}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Addittional Fee:
                    <span className="ml-1 font-normal">P{settings.additionalFee}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Total Budget: <span className="font-normal">P{settings.totalBudget}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

IteneraryTouristSpot.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.string.isRequired,
    LGU: PropTypes.string.isRequired,
    nameOfAttraction: PropTypes.string.isRequired,
    natureOfAttraction: PropTypes.string,
    classification: PropTypes.string.isRequired,
    operatingHours: PropTypes.string,
    typeOfAttraction: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dataConnectivity: PropTypes.string,
    securityHazards: PropTypes.string,
    nationalDeclarations: PropTypes.string,
    address: PropTypes.string.isRequired,
    roadCondition: PropTypes.string,
    owner: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    briefDescription: PropTypes.string.isRequired,
    entranceFee: PropTypes.number.isRequired,
    additionalFee: PropTypes.number.isRequired,
    totalBudget: PropTypes.number.isRequired,
  }).isRequired,
};

export default function Modal({ isOpen, onClose, settings }) {
  if (!isOpen) return null; // If not open, return nothing

  const components = {
    accommodation: Accommodation,
    tourist_spot: TouristSpot,
    itinerary_tourist_spot: IteneraryTouristSpot,
  };
  const Card = components[settings.type];

  return <Card settings={settings} onClose={onClose} />;
}
