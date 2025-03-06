import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { motion } from "framer-motion";
import logo from '../images/4.png';

function Signup() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "user",
    adminKey: "",
  });
  const [error, setError] = useState("");
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
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Address"
              value={formData.address}
              onChange={(e) => 
                setFormData({ ...formData, address: e.target.value })
              } 
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Region" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="number" placeholder="ZIP Code" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
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
