import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import landingimg from '../images/1.png';
import aboutimg from '../images/2.png';
export default function Home() {
  const navigate = useNavigate();

  const handlePlan = () => {
    navigate("/accommodations/");
  };

  return (
    <>
      <section id="hero" className="~h-[40rem]/[50rem] ~pt-24/28 ~pb-4/8 justify-center items-center">
        <div className="relative h-full">
          <LazyLoadImage src={landingimg} width="1700" alt="sample" className="h-full rounded-xl object-cover object-center brightness-50" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-16">
            <p className="font-bold text-4xl md:text-6xl lg:text-7xl text-center text-white tracking-tight leading-tight">
                <span className="text-blue-500 px-2 py-1">T</span>
                <span className="text-white">ourist</span>
                <span className="text-blue-500 px-2 py-1">C</span>
                <span className="text-white">ation</span>
            </p>
            <p className="font-normal text-sm md:text-lg text-center text-white mt-4">
                Plan your journey, explore new horizons, and save smartly.
            </p>
          </div>

          {/* BOTTOM RIGHT */}
          <button className="absolute right-6 bottom-9 flex justify-center items-center rounded-full transition-all bg-sky-500 hover:bg-sky-700 ~py-2/4 ~px-4/6 gap-2" onClick={handlePlan}>
            <span className="~text-sm/lg font-bold text-white">Plan your budget</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="~w-[0.875rem]/[1.125rem] fill-white">
              <path xmlns="http://www.w3.org/2000/svg" d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
            </svg>
          </button>
        </div>
      </section>

      <section id="about" className="~py-4/8 flex flex-wrap md:flex-row md:flex-nowrap justify-center items-center ~gap-6/8">
        <div className="flex flex-col gap-2">
          <p className="font-bold ~text-2xl/4xl text-sky-500">About</p>

          <p className="font-normal ~text-lg/2xl text-gray-400">
          TouristCation is a web-based application developed by Triumvirate, a group of students from the University of Makati, aiming to promote Philippine tourism. The primary focus of the application is to highlight the beauty of Region 1, comprising the four provinces of La Union, Ilocos Norte, Ilocos Sur, and Pangasinan. TouristCation seeks to benefit both travel enthusiasts and local establishments. For travelers, TouristCation serves as a recommender system that generates personalized travel itineraries, including suggestions for accommodations and tourist attractions based on their preferences. For establishments, it offers a platform to gain visibility and attract visitors, promoting their services both locally and internationally.
          </p>
        </div>
        <LazyLoadImage src={aboutimg} alt="sample" className="md:~max-w-80/[50rem] rounded-xl object-cover object-center" />
      </section>

      <section id="accomodations" className="~py-4/8 flex flex-col gap-6">
        <p className="font-bold ~text-4xl/6xl text-sky-500 text-center">Accommodations</p>

        <div className="flex flex-wrap gap-4 xl:flex-row h-full justify-center items-center">
          <LazyLoadImage src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/f2/a3/a2/amazing-top-floor-outside.jpg?w=300&h=-1&s=1" alt="sample" className="flex-1 sm:~max-w-80/96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/474690754.jpg?k=bd627dc9cdbc92777bd9d589405170ff8aae7a75691fc4aec6058d65a46a2f8b&o=&hp=1" alt="sample" className="flex-1 sm:~max-w-80/96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://cf.bstatic.com/xdata/images/hotel/max500/348730897.jpg?k=4ba4d7845cf37553290d51a1dc2899cbe88b8870aa338bb0e061cc44be2f72d9&o=" alt="sample" className="flex-1 sm:~max-w-80/96 rounded-xl object-cover object-center" />
        </div>
      </section>

      <section id="gallery" className="~py-4/8 flex flex-col gap-6">
        <p className="font-bold ~text-4xl/6xl text-sky-500 text-center">Tourist Attractions</p>

        <div className="flex flex-wrap gap-4 xl:flex-row h-full justify-center items-center">
          <LazyLoadImage src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/e2/3c/42/now-see-those-intricate.jpg?w=600&h=400&s=1" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/99/58/c7/img-20180410-110556-largejpg.jpg?w=500&h=-1&s=1" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://gttp.images.tshiftcdn.com/293476/x/0/blue-waters-and-green-landscape-in-mt-pinatubo-crater-lake.jpg?auto=format%2Ccompress&fit=crop&crop=focalpoint&h=207&fp-z=1.14&min-w=380&w=380" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5c/bc/85/caption.jpg?w=400&h=300&s=1" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://ik.imagekit.io/tvlk/blog/2023/07/shutterstock_1291277695-3.jpg?tr=dpr-2,w-675" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
          <LazyLoadImage src="https://i.pinimg.com/originals/c0/c3/66/c0c366b3a9a49c97477be9005b72ce4f.png" alt="sample" className="flex-1 sm:max-w-96 rounded-xl object-cover object-center" />
        </div>
      </section>
    </>
  );
}
