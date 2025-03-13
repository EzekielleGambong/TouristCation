import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, sendOtpAPI, verifyOtpAPI } from "../services/api";
import { motion } from "framer-motion";
import axios from "axios"; 
import logo from '../images/4.png';
const regions = {
  "NCR": ["Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong", "Manila", "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "Pateros", "Quezon City", "San Juan", "Taguig", "Valenzuela"],
  "REGION I": ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
  "REGION II": ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
  "REGION III": ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
  "REGION IV-A": ["Batangas", "Cavite", "Laguna", "Quezon", "Rizal"],
  "MIMAROPA": ["Marinduque", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Romblon"],
  "REGION V": ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"],
  "CAR": ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"],
  "REGION VI": ["Aklan", "Antique", "Capiz", "Guimaras", "Iloilo"],
  "NIR": ["Negros Occidental", "Negros Oriental", "Siquijor"],
  "REGION VII": ["Bohol", "Cebu"],
  "REGION VIII": ["Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte"],
  "REGION IX": ["Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"],
  "REGION X": ["Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental"],
  "REGION XI": ["Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental"],
  "REGION XII": ["Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"],
  "REGION XIII": ["Agusan del Norte", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur"],
  "BARMM": ["Basilan", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur", "Tawi-Tawi", "Sulu"]
};
function Signup() {
  const [data, setData] = useState({ fname: "", lname: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    country: "Philippines",
    region: "",
    city: "",
    barangay: "",
    role: "user",
    adminKey: "",
  });
  // ✅ Handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.lname || !formData.email || !formData.password) {
      return setError("All fields are required");
    }
    if (!validatePassword(formData.password)) {
      return setError("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.");
    }
    try {
      await signupUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up");
    }
  };


  const sendOtp = async (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.lname || !formData.email || !formData.password) {
      return setError("All fields are required");
    }
    if (!validatePassword(formData.password)) {
      return setError("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.");
    }
    try {
      const data = await sendOtpAPI(formData); // Call the API function from api.js
      console.log("Response:", data);
      setOtpSent(true); // ✅ Update state to show the OTP form
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.message || "Failed to send OTP");
    }
  };


  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log("Sending request with:", { ...formData, otp }); // Debugging: Send formData
  
    try {
      const data = await verifyOtpAPI(formData, otp); // Use the refactored API method
      setSuccess(data.message); // Assuming the response has a `message`
      setOtpSent(false); // Update state
      navigate("/login");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setError(error.message || "Invalid OTP");
    }
  };



  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#D1FFBD" }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-40 h-20 mb-2" />
          <h1 className="text-3xl font-extrabold text-gray-800">Join Us</h1>
          <p className="text-gray-500">Start your journey with us today.</p>
        </div>
        {!otpSent ? (
          <form onSubmit={sendOtp} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.fname}
                onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lname}
                onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Country"
                value={formData.country}
                readOnly
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => 
                  setFormData({ ...formData, address: e.target.value })
                } 
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value, province: "" })} className="w-full px-4 py-3 border rounded-lg">
              <option value="">Select Region</option>
              {Object.keys(regions).map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            
            <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border rounded-lg" disabled={!formData.region}>
              <option value="">Select Province/City</option>
              {formData.region && regions[formData.region].map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            
            <input type="text" placeholder="Barangay" value={formData.barangay} onChange={(e) => setFormData({ ...formData, barangay: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
            
            <div>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            {formData.role === "admin" && (
              <div>
                <input
                  type="text"
                  placeholder="Admin Key"
                  value={formData.adminKey}
                  onChange={(e) =>
                    setFormData({ ...formData, adminKey: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="w-4 h-4" />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree to the <a href="https://sites.google.com/view/touristcation-terms/home" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline" onClick={() => setIsChecked(true)}>Terms & Conditions</a> and <a href="https://sites.google.com/view/touristcation-policy/home" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline" onClick={() => setIsChecked(true)}>Privacy Policy</a>.
              </label>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={!isChecked} className={`w-full py-3 rounded-lg shadow-md font-semibold transition ${isChecked ? "bg-indigo-500 text-white hover:bg-indigo-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}>
              Sign Up
            </button>
          </form>
        ) : (

          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <form onSubmit={verifyOtp}>
              <h1 className="text-2xl font-semibold mb-4">Verify OTP</h1>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
        )}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </motion.div>
    
  );
}

export default Signup;
