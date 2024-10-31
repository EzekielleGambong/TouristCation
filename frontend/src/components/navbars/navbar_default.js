import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NavbarDefault() {
  const [isOpen, setIsOpen] = useState(false);

  // # ~ ~ ~ ~ ~ # PAGES # ~ ~ ~ ~ ~ # //
  const [page, setPage] = useState();
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPage("Home");
        break;
      case "/about":
        setPage("About");
        break;
      case "/accomodations":
        setPage("Accomodations");
        break;
      case "/tours":
        setPage("Tours");
        break;
      case "/packages":
        setPage("Packages");
        break;
      case "/gallery":
        setPage("Gallery");
        break;
      default:
        setPage("ERROR");
        break;
    }
  }, [location.pathname]);

  // # ~ ~ ~ ~ ~ # NAVIGATIONS # ~ ~ ~ ~ ~ # //
  const Navigations = [
    // { name: "Home", href: "/", current: page === "Home" },
    { name: "About", href: "#about", current: page === "About" },
    { name: "Accomodations", href: "#accomodations", current: page === "Accomodations" },
    // { name: "Tours", href: "/tours", current: page === "Tours" },
    // { name: "Packages", href: "/packages", current: page === "Packages" },
    { name: "Gallery", href: "#gallery", current: page === "Gallery" },
  ];

  return (
    <nav className="absolute top-0 w-full bg-gray-100 z-50">
      <div className="2xl:container 2xl:mx-auto py-2 px-2 xl:px-12">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-sky-500 hover:bg-sky-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center xl:justify-between">
            {/* ICON */}
            <div className="flex flex-shrink-0 items-center">
              <a href="/" className="font-extrabold ~text-xl/4xl text-sky-500" aria-current={page === "Home" ? "page" : ""}>
                TouristCation
              </a>
            </div>

            {/* NAVIGATIONS */}
            <div className="hidden xl:block">
              <div className="flex space-x-8">
                {Navigations.map((navigation) => (
                  <a
                    key={navigation.name}
                    href={navigation.href}
                    // className={classNames(navigation.current ? `underline underline-offset-8 decoration-4 font-bold` : `font-normal`, "text-lg text-sky-500")}
                    className="font-normal text-lg text-sky-500"
                    // aria-current={navigation.current ? "page" : ""}
                  >
                    {navigation.name}
                  </a>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div className="hidden xl:flex flex-shrink-0 items-center">
              <a href="/" className="font-bold text-lg text-sky-500">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={isOpen ? "" : "hidden"} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {Navigations.map((navigation) => (
            <a
              key={navigation.name}
              href={navigation.href}
              // className={classNames(navigation.current ? `bg-sky-500 text-white` : `text-sky-500`, "block rounded-md  px-3 py-2 text-base font-medium")}
              className="block rounded-md  px-3 py-2 text-base font-medium text-sky-500"
              // aria-current={navigation.current ? "page" : ""}
            >
              {navigation.name}
            </a>
          ))}

          <a href="/" className="text-sky-500 block rounded-md  px-3 py-2 text-base font-medium">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
