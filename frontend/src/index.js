import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// # ~ ~ ~ ~ ~ # CSS # ~ ~ ~ ~ ~ # //
import "./index.css";

// # ~ ~ ~ ~ ~ # LAYOUTS # ~ ~ ~ ~ ~ # //
import LayoutDefault from "./components/layouts/layout_default";

// # ~ ~ ~ ~ ~ # PAGES # ~ ~ ~ ~ ~ # //
import Home from "./pages/Home";
import About from "./pages/About";
import Accomodations from "./pages/Accomodations";
import Tours from "./pages/Tours";
import Packages from "./pages/Packages";
import Gallery from "./pages/Gallery";

const root = ReactDOM.createRoot(document.getElementById("root"));
export default function TouristCation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/accomodations" element={<Accomodations />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>

        {/* SAMPLE */}
        {/* <Route path="/user/" element={<LayoutUser />}>
          <Route path="/user/packages" element={<Packages />} />
          <Route path="/user/new_client" element={<NewClient />} />
          <Route path="/user/client_status" element={<ClientStatus />} />
          <Route path="/user/reports" element={<Reports />} />
          <Route path="/user/client_history" element={<ClientHistory />} />

          <Route index element={<Error />} />
          <Route path="/user/*" element={<Error />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <TouristCation />
  </React.StrictMode>
);
