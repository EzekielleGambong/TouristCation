import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

// # ~ ~ ~ ~ ~ # AUTH PAGES # ~ ~ ~ ~ ~ # //
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

export default function TouristCation() {
  const PrivateRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" />;
    if (role && role !== userRole) return <Navigate to="/profile" />;

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to Signup */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Default Layout Routes */}
        <Route path="/page" element={<LayoutDefault />}>
          <Route path="/page/home" element={<Home />} />
          <Route path="/page/terms_and_conditions" element={<TermsAndConditions />} />
          <Route path="/page/privacy_policy" element={<PrivacyPolicy />} />
        </Route>

        {/* Title Layout Routes */}
        <Route path="/" element={<LayoutTitle />}>
          <Route path="/accommodations/" element={<Accommodations />} />
          <Route path="/itinerary-review/" element={<ItineraryReview />} />
        </Route>

        <Route path="/accommodations/" element={<LayoutTitle />}>
          <Route path="/accommodations/tourist-spots/" element={<TouristSpots />} />
        </Route>

        <Route path="/accommodations/tourist-spots/" element={<LayoutTitle />}>
          <Route
            path="/accommodations/tourist-spots/itinerary-review"
            element={<ItineraryReview />}
          />
        </Route>

        {/* Auth and Profile Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <TouristCation />
  </React.StrictMode>
);
