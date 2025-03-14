import { useState } from "react";

import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Modal from "../modals/modal";

function Accommodation({ settings, isModal, toggleModal }) {
  return (
    <div className="flex-grow w-full flex flex-col rounded-xl overflow-hidden shadow-md border border-gray-200">
      <LazyLoadImage src={settings.link} alt="sample" className="aspect-[3/2] max-h-64 object-cover object-center bg-gray-400" />

      <div className="bg-white p-3 space-y-2">
        <div className="flex flex-col">
          <p className="line-clamp-1 font-bold ~text-sm/lg">{settings.nameOfEstablishments}</p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            Address: <span className="font-normal">{settings.address}</span>
          </p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            Room: <span className="font-normal">{settings.room}</span>
          </p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            Maximum Occupancy: <span className="font-normal">{settings.pax}</span>
          </p>
          <p className="line-clamp-1 font-bold ~text-xs/base">
            Contact: <span className="font-normal">{settings.contactNumber}</span>
          </p>
        </div>
        <p className="line-clamp-1 font-normal ~text-xs/base">{settings.description}</p>

        <p className="text-center font-medium ~text-lg/2xl">P{settings.price} per night</p>
        <button type="button" onClick={toggleModal} className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
          More information
        </button>

        {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
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

function TouristSpot({ settings, isModal, toggleModal }) {
  return (
    <div className="flex-grow max-w-[1/2] flex flex-col rounded-xl overflow-hidden">
      <LazyLoadImage src={settings.link} alt="sample" className="aspect-[3/2] max-h-64 object-cover object-center bg-gray-400" />

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
    <div className="flex-grow max-w-[1/2] flex flex-col rounded-xl overflow-hidden shadow">
      <LazyLoadImage src={settings.link} alt="sample" className="aspect-[3/2] max-h-64 object-cover object-center bg-gray-400" />

      <div className="bg-white p-3 space-y-3">
        <div className="space-y-2">
          <p className="font-bold line-clamp-1 ~text-sm/lg">{settings.nameOfAttraction}</p>
          <div className="flex flex-col">
            <p className="font-bold ~text-xs/base">
              Distance: <span className="font-normal">{settings.distance} km</span>
            </p>
            <p className="font-bold ~text-xs/base">
              Type of Attraction: <span className="font-normal">{settings.typeOfAttractions}</span>
            </p>
            <p className="line-clamp-1 font-bold ~text-xs/base">
              Address:
              <span className="ml-1 font-normal">{settings.address}</span>
            </p>
          </div>

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

        <button type="button" onClick={toggleModal} className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4">
          View Details
        </button>

        {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
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
    typeOfAttractions: PropTypes.string.isRequired,
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
