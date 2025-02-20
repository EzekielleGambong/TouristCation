import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import Predictions from "../components/layouts"; // Import the modal component
import { motion } from "framer-motion";
import logo from '../images/4.png';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPredictions, setShowPredictions] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Check if required fields are missing
      if (!data.user.travelStylePrediction || data.user.travelStylePrediction === "" 
          // ||
          // !data.user.averagePricePreference || data.user.averagePricePreference === 0 ||
          // !data.user.averagePriceShopPreference || data.user.averagePriceShopPreference === 0
          ){
        setShowPredictions(true); // Show modal if fields are missing
      } else {
        navigate(data.role === "admin" ? "/admin" : "/page/home");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      {showPredictions ? (
        <Predictions />
      ) : (
        <motion.div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#D1FFBD" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >

          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
            <div className="flex flex-col items-center mb-6">
              <img src={logo} alt="Logo" className="w-40 h-20 mb-2" />
              <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
              <p className="text-gray-500">Login to access your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md font-semibold hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Login;
