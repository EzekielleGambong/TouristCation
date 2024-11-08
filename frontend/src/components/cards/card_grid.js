import { useState } from "react";

import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Modal from "../modals/modal";

function Accommodation({ settings, isModal, toggleModal }) {
  return (
    <div className="flex-grow max-w-[1/2] flex flex-col rounded-xl overflow-hidden">
      <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="aspect-[3/2] max-h-64 object-cover object-center bg-gray-400" />

      <div className="bg-white p-3 space-y-2">
        <div className="space-y-3">
          <p className="font-bold ~text-sm/lg">{settings.destination}</p>
          <p className="~min-h-16/24 line-clamp-4 font-normal ~text-xs/base">{settings.description}</p>
        </div>

        <p className="text-center font-medium ~text-lg/2xl">P{settings.cost} per night</p>
        <button type="button" onClick={toggleModal} className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
          More information
        </button>

        {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
      </div>
    </div>
  );
}

function TouristSpot({ settings, isModal, toggleModal }) {
  return (
    <div className="flex-grow max-w-[1/2] flex flex-col rounded-xl overflow-hidden">
      <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="aspect-[3/2] max-h-64 object-cover object-center bg-gray-400" />

      <div className="bg-white p-3 space-y-2">
        <div className="space-y-3">
          <p className="font-bold ~text-sm/lg">{settings.destination}</p>
          <p className="~min-h-16/24 line-clamp-4 font-normal ~text-xs/base">{settings.description}</p>
        </div>

        <button type="button" onClick={toggleModal} className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
          More information
        </button>

        {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
      </div>
    </div>
  );
}

function IteneraryTouristSpot({ settings, isModal, toggleModal }) {
  return (
    <div className="flex-grow max-w-[1/2] flex flex-col rounded-xl overflow-hidden">
      <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="aspect-[3/2] max-h-64 object-cover object-center bg-gray-400" />

      <div className="bg-white p-3 space-y-3">
        <div className="space-y-2">
          <p className="font-bold line-clamp-1 ~text-sm/lg">{settings.destination}</p>
          <p className="~min-h-8/12 line-clamp-2 font-bold ~text-xs/base">
            Address:
            <span className="ml-1 font-normal">{settings.address}</span>
          </p>

          <div className="flex flex-col">
            <p className="font-bold ~text-xs/base">
              Cost: <span className="font-normal">P{settings.cost}</span>
            </p>
            <p className="font-bold ~text-xs/base">
              Budget Allocated:
              <span className="ml-1 font-normal">P{settings.budget_allocated}</span>
            </p>
            <p className="font-bold ~text-xs/base">
              Total Budget: <span className="font-normal">P{settings.total_budget}</span>
            </p>
          </div>
        </div>

        <button type="button" onClick={toggleModal} className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
          View Details
        </button>

        {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
      </div>
    </div>
  );
}

export default function CardGrid({ settings }) {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const components = {
    accommodation: Accommodation,
    tourist_spot: TouristSpot,
    itinerary_tourist_spot: IteneraryTouristSpot,
  };
  const Card = components[settings.type];

  return <Card settings={settings} isModal={isModal} toggleModal={toggleModal} />;
}

CardGrid.propTypes = {
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
