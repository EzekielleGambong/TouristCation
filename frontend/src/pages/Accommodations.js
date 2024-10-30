import { useNavigate } from "react-router-dom";
import { useStorePlan } from "../hooks/useStore";

import Sort from "../components/others/sort";
import Filter from "../components/others/filter";
import View from "../components/others/view";
import CardGrid from "../components/cards/card_grid";

function SelectedAccommodation() {
  const navigate = useNavigate();
  const { setAccommodation } = useStorePlan((state) => state);

  const handleSetAccommodation = () => {
    setAccommodation("1"); // Set the value in Zustand store
    navigate("/accommodations/tourist-spots/"); // Navigate to Page 2
  };

  return (
    <div id="selected_accomomdation" className="flex flex-col rounded-xl border border-black bg-gray-300 p-4 gap-y-3">
      <div className="flex flex-col space-y-2">
        <span className="font-bold ~text-sm/lg">Selected Accommodation</span>
        <div className="rounded-xl bg-white p-3">
          <p className="font-bold ~text-sm/lg">Accommodation</p>
          <p className="font-normal ~text-xs/base">Room Type</p>
          <p className="font-normal ~text-xs/base">$$$ per night</p>
        </div>
      </div>

      <button className="rounded-xl transition-all bg-sky-500 hover:bg-sky-700 uppercase ~text-xs/base font-bold text-white ~py-2/4" onClick={handleSetAccommodation}>
        Set Accommodation
      </button>
    </div>
  );
}

export default function Accommodations() {
  const settings = [
    {
      value: "sort_1",
      text: "Sort 1",
    },
    {
      value: "sort_2",
      text: "Sort 2",
    },
    {
      value: "sort_3",
      text: "Sort 3",
    },
  ];
  const { province } = useStorePlan((state) => state);

  const cardSettings = [
    {
      type: "accommodation",
      id: "1",
      destination: "Accommodation 1",
      address: "Address of Accommodation 1",
      contact: "Contact of Accommodation 1",
      description: "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "P2,000 - P4,000 per night",
    },
    {
      type: "accommodation",
      id: "2",
      destination: "Accommodation 2",
      address: "Address of Accommodation 2",
      contact: "Contact of Accommodation 2",
      description: "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "P3,000 - P5,000 per night",
    },
    {
      type: "accommodation",
      id: "3",
      destination: "Accommodation 3",
      address: "Address of Accommodation 3",
      contact: "Contact of Accommodation 3",
      description: "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "P4,000 - P6,000 per night",
    },
    {
      type: "accommodation",
      id: "4",
      destination: "Accommodation 4",
      address: "Address of Accommodation 4",
      contact: "Contact of Accommodation 4",
      description: "Veniam ex non commodo ipsum tempor qui enim. Velit ex enim cillum ex ex. Nisi non nostrud in tempor aliqua consequat laborum exercitation enim ipsum. Velit quis aliquip proident sunt. Minim pariatur consectetur mollit consectetur.",
      cost: "P5,000 - P7,000 per night",
    },
  ];

  return (
    <>
      <section className="basis-1/3 w-full ~space-y-4/8">
        <Sort settings={settings} />
        <div className="lg:sticky top-4 ~space-y-2/3">
          <Filter FilterOptions={[0, 1, 2, 3, 4]} />
          <SelectedAccommodation />
        </div>
      </section>

      <section className="w-full ~space-y-4/8">
        <div className="h-16 flex flex-row items-center">
          <p className="w-full font-bold ~text-2xl/4xl text-sky-500">{province}</p>
          <View />
        </div>

        <div className="sm:grid sm:grid-cols-2 gap-4">
          {cardSettings.map((settings, index) => (
            <CardGrid key={index} settings={settings} />
          ))}
        </div>
      </section>
    </>
  );
}
