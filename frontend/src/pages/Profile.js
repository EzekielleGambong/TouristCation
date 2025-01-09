import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const savedLocations = ["New York", "San Francisco", "Los Angeles"];
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-spin border-2 border-t-blue-500 border-blue-300"></div>
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome, {profile.name}
        </h1>
        <p className="text-lg text-gray-600 mb-2 text-center">Email: {profile.email}</p>
        <p className="text-lg text-blue-500 mb-4 text-center">
          Role: {profile.role === "admin" ? "Admin" : "User"}
        </p>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Saved Budget Locations</h2>
          {savedLocations.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {savedLocations.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No saved locations yet.</p>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/page/home")}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Homepage
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
