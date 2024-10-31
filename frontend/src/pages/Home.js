import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useStorePlan } from "../hooks/useStore";

export default function Home() {
  const navigate = useNavigate();
  const { setProvince } = useStorePlan((state) => state);

  const handlePlan = () => {
    setProvince("La Union");
    navigate("/accommodations/");
  };

  return (
    <>
      <section id="hero" className="~h-[40rem]/[50rem] ~pt-24/28 ~pb-4/8 justify-center items-center">
        <div className="relative h-full">
          <LazyLoadImage src="https://picsum.photos/2000/720" width="1700" alt="sample" className="h-full rounded-xl object-cover object-center brightness-50" />

          {/* CENTER */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-16">
            <p className="font-bold text-4xl md:~text-6xl/9xl text-center text-white">Header text</p>
            <p className="font-normal ~text-sm/lg text-center text-white">Sub Text</p>

            <label className="flex items-center ~w-48/96 rounded-xl ~mt-6/8 ~py-1/2 ~px-4/6 ~text-xs/base bg-gray-100">
              <span className="material-symbols-rounded ~text-sm/lg">search</span>

              <input type="text" className="w-full bg-gray-100 border-transparent focus:border-transparent focus:ring-0 ~text-sm/lg" placeholder="Select a Province" />
            </label>
          </div>

          {/* BOTTOM RIGHT */}
          <button
            className="absolute right-6 bottom-9 flex justify-center items-center rounded-full transition-all bg-sky-500 hover:bg-sky-700 ~text-sm/lg font-bold text-white ~py-2/4 ~px-4/6"
            onClick={handlePlan}
          >
            Plan your budget <span className="material-symbols-rounded ml-2 ~text-sm/lg">arrow_right_alt</span>
          </button>
        </div>
      </section>

      <section id="about" className="~py-4/8 flex flex-wrap md:flex-row md:flex-nowrap justify-center items-center ~gap-6/8">
        <div className="flex flex-col gap-2">
          <p className="font-bold ~text-2xl/4xl text-sky-500">About</p>

          <p className="font-normal ~text-lg/2xl text-gray-400">
            By creating a visual guide along the way, the designer or developer can get input from the other people involved in the website such as the customer, their manager, and other members of
            the team.
          </p>
        </div>
        <LazyLoadImage src="https://picsum.photos/1500/1200" alt="sample" className="md:~max-w-80/[50rem] rounded-xl object-cover object-center" />
      </section>

      <section id="accomodations" className="~py-4/8 flex flex-col gap-6">
        <p className="font-bold ~text-4xl/6xl text-sky-500 text-center">Accommodations</p>

        <div className="flex flex-wrap gap-4 xl:flex-row h-full justify-center items-center">
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:~max-w-80/96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:~max-w-80/96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:~max-w-80/96 rounded-xl object-cover object-center" />
        </div>
      </section>

      <section id="gallery" className="~py-4/8 flex flex-col gap-6">
        <p className="font-bold ~text-4xl/6xl text-sky-500 text-center">Gallery</p>

        <div className="flex flex-wrap gap-4 xl:flex-row h-full justify-center items-center">
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://picsum.photos/1500" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
        </div>
      </section>
    </>
  );
}
