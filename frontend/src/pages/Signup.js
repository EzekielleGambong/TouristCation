import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.lname || !formData.email || !formData.password) {
      return setError("All fields are required");
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-3xl font-extrabold text-gray-800">Join Us</h1>
          <p className="text-gray-500">Start your journey with us today.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={formData.fname}
              onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg shadow-md font-semibold hover:bg-indigo-600 transition"
          >
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
