import { useState, useEffect } from "react";
import { useStorePlan } from "../../hooks/useStore";

import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Accommodation({ settings, onClose }) {
  const { setAccommodation } = useStorePlan((state) => state);

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center p-4">
          <div className="relative transform overflow-hidden sm:w-full sm:max-w-2xl shadow-xl transition-all rounded-lg bg-white text-left sm:my-8">
            <div className="flex flex-col rounded-xl bg-gray-200">
              <div className="relative">
                <LazyLoadImage src="https://picsum.photos/1400/720" width="800" alt="sample" className="h-full aspect-[5/3] object-center" />
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full transition-all bg-sky-500 hover:bg-sky-700 fill-white p-1" onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-2 p-6">
                <p className="font-bold ~text-lg/2xl">{settings.price}</p>
                <div className="flex flex-col">
                  <p className="font-bold ~text-xs/base">
                    Address: <span className="font-normal">{settings.price}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Contact: <span className="font-normal">{settings.price}</span>
                  </p>
                </div>
                <p className="font-normal ~text-xs/base">{settings.price}</p>

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
                <LazyLoadImage src="https://picsum.photos/1400/720" width="800" alt="sample" className="h-full aspect-[5/3] object-center" />
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
                <LazyLoadImage src="https://picsum.photos/1400/720" width="800" alt="sample" className="h-full aspect-[5/3] object-center bg-gray-400" />
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full transition-all bg-sky-500 hover:bg-sky-700 fill-white p-1" onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-2 p-6">
                <p className="font-bold ~text-lg/2xl">{settings.destination}</p>

                <div className="flex flex-col">
                  <p className="font-bold ~text-xs/base">
                    Address: <span className="font-normal">{settings.address}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Contact: <span className="font-normal">{settings.contact}</span>
                  </p>
                </div>

                <p className="font-normal ~text-xs/base">{settings.description}</p>

                <div className="flex flex-col">
                  <p className="font-bold ~text-xs/base">
                    Cost: <span className="font-normal">P{settings.cost}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Budget Allocated: <span className="font-normal">P{settings.budget_allocated}</span>
                  </p>
                  <p className="font-bold ~text-xs/base">
                    Total Budget: <span className="font-normal">P{settings.total_budget}</span>
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

Modal.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,

    destination: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    cost: PropTypes.number.isRequired,
    budget_allocated: PropTypes.number,

    rating: PropTypes.number,
  }).isRequired,
};
