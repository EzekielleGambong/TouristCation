import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import API from "../../services/api";

// Create the context
export const InactivityContext = createContext();

// Create the provider component
export const InactivityProvider = ({ children }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  // Redirect to login if no token is found
  useEffect(() => {
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      window.location.href = "/login";
      return;
    }
  }, [token]);

  // Function to reset the inactivity timer
  const resetInactivityTimer = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const response = await API.post(
        "/users/activity",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Activity updated:", response.data);
    } catch (error) {
      console.error(
        "Error updating activity:",
        error.response?.data || error.message
      );
    }
  };

  // Function to unlock the session
  const handleUnlock = async () => {
    try {
      const response = await axios.post(
        "/users/unlock",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setIsLocked(false);
      }
    } catch (error) {
      alert("Invalid password");
    }
  };

  // Set up the inactivity timer (every 30s)
  useEffect(() => {
    const activityInterval = setInterval(() => {
      resetInactivityTimer();
    }, 30000);

    return () => clearInterval(activityInterval);
  }, [token]);

  // Lock screen after 1 min of inactivity
  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLocked(true);
    }, 60000); // Lock after 1 min

    const handleUserActivity = () => {
      clearTimeout(timeout);
      resetInactivityTimer();
      timeout = setTimeout(() => {
        setIsLocked(true);
      }, 60000);
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, [token]);

  // Provide the context value
  const contextValue = {
    isLocked,
    password,
    setPassword,
    handleUnlock,
  };

  return (
    <InactivityContext.Provider value={contextValue}>
      {children}
    </InactivityContext.Provider>
  );
};
