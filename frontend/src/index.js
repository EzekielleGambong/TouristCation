import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// # ~ ~ ~ ~ ~ # CSS # ~ ~ ~ ~ ~ # //
import "./index.css";

// # ~ ~ ~ ~ ~ # LAYOUTS # ~ ~ ~ ~ ~ # //
import LayoutDefault from "./components/layouts/layout_default";
import LayoutTitle from "./components/layouts/layout_title";

// # ~ ~ ~ ~ ~ # PAGES # ~ ~ ~ ~ ~ # //
import Home from "./pages/Home";
import Sample from "./pages/sample";
import Accommodations from "./pages/Accommodations";
import TouristSpots from "./pages/TouristSpots";
import ItineraryReview from "./pages/ItineraryReview";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const root = ReactDOM.createRoot(document.getElementById("root"));
export default function TouristCation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={< Home/>} />
          <Route path="/terms_and_conditions" element={<TermsAndConditions />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        </Route>

        <Route path="/" element={<LayoutTitle />}>
          <Route path="/accommodations/" element={<Accommodations />} />
          <Route path="/itinerary-review/" element={<ItineraryReview />} />
        </Route>

        <Route path="/accommodations/" element={<LayoutTitle />}>
          <Route path="/accommodations/tourist-spots/" element={<TouristSpots />} />
        </Route>

        <Route path="/accommodations/tourist-spots/" element={<LayoutTitle />}>
          <Route path="/accommodations/tourist-spots/itinerary-review" element={<ItineraryReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <TouristCation />
  </React.StrictMode>
);
