export default function NavbarPlan() {
  return (
    <nav className="absolute top-0 w-full bg-gray-100 z-50">
      <div className="sm:container sm:mx-auto py-2 px-2 sm:px-12">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <a href="#contact_us">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="rgb(14 165 233)" className="w-8">
                <path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm-21-241q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Z" />
              </svg>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-between">
            {/* ICON */}
            <div className="flex flex-shrink-0 items-center">
              <a href="/" className="font-extrabold ~text-xl/4xl text-sky-500">
                TouristCation
              </a>
            </div>

            {/* CONTACT */}
            <div className="hidden sm:flex flex-shrink-0 items-center">
              <a href="#contact_us" className="font-bold text-lg text-sky-500">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
