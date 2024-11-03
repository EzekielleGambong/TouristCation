import PropTypes from "prop-types";
import { useStorePlan } from "../hooks/useStore";
import { LazyLoadImage } from "react-lazy-load-image-component";

import CardGrid from "../components/cards/card_grid";

function AccommodationInformation({ settings }) {
  return (
    <div className="flex flex-row space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="~w-5/8 fill-black">
        {settings.icon}
      </svg>
      <div className="flex flex-col">
        <p className="font-normal ~text-xs/base">{settings.title}</p>
        <p className="font-normal ~text-xs/base">{settings.data}</p>
      </div>
    </div>
  );
}

AccommodationInformation.propTypes = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function ItineraryReview() {
  const { province } = useStorePlan((state) => state);
  const accommodationInfo = [
    {
      icon: (
        <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
      ),
      title: "Check In",
      data: "00/00/0000",
    },
    {
      icon: (
        <path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
      ),
      title: "Check Out",
      data: "00/00/0000",
    },
    {
      icon: (
        <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z" />
      ),
      title: "Travelers",
      data: "00",
    },
  ];

  const cardSettings = [
    {
      type: "itinerary_tourist_spot",
      id: "1",
      destination: "Tourist Spot 1",
      address: "Address of Tourist Spot 1",
      contact: "Contact of Tourist Spot 1",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "Free",
      budget_allocated: "P1000",
    },
    {
      type: "itinerary_tourist_spot",
      id: "2",
      destination: "Tourist Spot 2",
      address: "Address of Tourist Spot 2",
      contact: "Contact of Tourist Spot 2",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "P200",
      budget_allocated: "P400",
    },
    {
      type: "itinerary_tourist_spot",
      id: "3",
      destination: "Tourist Spot 3",
      address: "Address of Tourist Spot 3",
      contact: "Contact of Tourist Spot 3",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "P50",
      budget_allocated: "P400",
    },
    {
      type: "itinerary_tourist_spot",
      id: "4",
      destination: "Tourist Spot 4",
      address: "Address of Tourist Spot 4",
      contact: "Contact of Tourist Spot 4",
      description:
        "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "P120",
      budget_allocated: "P200",
    },
  ];

  return (
    <div className="w-full flex flex-col ~space-y-6/8">
      <section className="relative">
        <LazyLoadImage src="https://picsum.photos/2000" alt="sample" className="w-full min-h-60 aspect-[5/2] object-cover object-center brightness-50" />

        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold ~text-3xl/5xl text-center text-white">Map Here</p>
      </section>

      <section className="flex flex-col ~space-y-1/2">
        <p className="w-full font-bold ~text-2xl/4xl text-sky-500">{province}</p>

        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-10 fill-black">
              <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
            </svg>
            <p className="font-bold ~text-xl/3xl">Accommodation</p>
          </div>
          <p className="font-normal ~text-base/xl">Address</p>
        </div>

        <div className="flex flex-row place-items-center ~space-x-2/12">
          {accommodationInfo.map((settings, index) => (
            <>
              <AccommodationInformation key={index} settings={settings} />
              {index !== 2 && <hr className="w-0.5 ~h-10/12 border-black border" />}
            </>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-row items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-8 fill-black">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"
            />
          </svg>
          <p className="font-bold ~text-xl/3xl">Tourist Spots</p>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cardSettings.map((settings, index) => (
            <CardGrid key={index} settings={settings} />
          ))}
        </div>
      </section>
    </div>
  );
}
