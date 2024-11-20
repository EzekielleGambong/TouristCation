import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import firstimg from '../../images/6.png';
import secondimg from '../../images/7.png';
import NavbarPlan from "../navbars/navbar_plan";
import FooterDefault from "../footers/footer_default";

export default function LayoutTitle() {
  // # ~ ~ ~ ~ ~ # PAGES # ~ ~ ~ ~ ~ # //
  const [page, setPage] = useState();
  const [pics, setPics] = useState();
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/accommodations":
      case "/accommodations/":
        setPage("Accommodations");
        setPics(firstimg);
        break;
      case "/accommodations/tourist-spots":
      case "/accommodations/tourist-spots/":
        setPage("Tourist Spots");
        break;
      case "/itinerary-review/":
      case "/accommodations/tourist-spots/itinerary-review":
      case "/accommodations/tourist-spots/itinerary-review/":
        setPage("Itinerary Review");
        setPics(secondimg);
        break;
      default:
        setPage("ERROR");
        break;
    }
  }, [location.pathname]);

  return (
    <div className="h-screen">
      {/* NAVBAR */}
      <NavbarPlan />

      {/* TITLE */}
      <section id="#title" className="pt-20 ~pb-4/8 justify-center items-center">
        <div className="relative">
          <LazyLoadImage src={pics} alt="sample" className="w-full max-h-80 aspect-[5/2] object-cover object-center brightness-50 bg-gray-400" />

          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold ~text-3xl/5xl text-center text-white"></p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="2xl:container 2xl:mx-auto lg:flex lg:space-y-0 lg:~space-x-4/7 space-y-8 px-6 xl:px-12">
        <Outlet />
      </main>

      {/* FOOTER */}
      <FooterDefault />
    </div>
  );
}
