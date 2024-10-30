import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "../modals/modal";

export default function CardGrid({ settings }) {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="flex-grow max-w-[1/2] flex flex-col rounded-xl overflow-hidden">
      <img src="https://picsum.photos/1500" alt="sample" className="aspect-[3/2] max-h-64 object-cover object-center bg-white" />

      <div className="bg-white p-3 space-y-3">
        <div className="space-y-3">
          <p className="font-bold ~text-sm/lg">{settings.destination}</p>
          <p className="~min-h-16/24 line-clamp-4 font-normal ~text-xs/base">{settings.description}</p>
        </div>

        {settings.type === "accommodation" && <p className="text-center font-medium ~text-lg/2xl">{settings.cost}</p>}
        <button className="w-full rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4" onClick={toggleModal}>
          More information
        </button>

        {isModal && <Modal isOpen={isModal} onClose={toggleModal} settings={settings} />}
      </div>
    </div>
  );
}

CardGrid.propTypes = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      destination: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      cost: PropTypes.string.isRequired,
      rating: PropTypes.number,
    })
  ).isRequired,
};
