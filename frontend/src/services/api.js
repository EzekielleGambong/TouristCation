import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("Token in interceptor:", token);
  if (token && !req.url.includes("/api/users/signup") && !req.url.includes("/api/users/login")) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Request headers:", req.headers);
  return req;
});

  
export const uploadImage = (formData) =>
  API.post("/users/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const loginUser = (formData) => API.post("/api/users/login", formData);
export const signupUser = (formData) => API.post("/api/users/signup", formData);
export const fetchProfile = () => API.get("/api/users/profile");
export const fetchAdminData = () => API.get("/api/users/admin-data");
export const updateProfile = (updatedProfile) => API.put("/api/users/profile", updatedProfile);


export const fetchTotalUsers = async () => {
  const response = await API.get("/api/users/total-users");
  return response.data;
};

export const fetchTotalTourist = async () => {
  const response = await API.get("/api/users/total-tourist");
  return response.data;
};

export const fetchTotalAccommodations = async () => {
  const response = await API.get("/api/users/total-acco");
  return response.data;
};

export const addTouristSpot = (formData) => API.post("/api/touristspots/add", formData);
export const addAccomodation = (accommodationData) => API.post("/api/accommodation/add", accommodationData);



export const fetchAttractionsByTravelStyle = (travelStyle) =>
  API.get(`/api/touristspots/filtered?travelStyle=${encodeURIComponent(travelStyle)}`);

export const fetchFilteredFood = (category) =>
  API.get(`/api/food/filtered?category=${encodeURIComponent(category)}`);


export const saveItineraryAPI = (itineraryData) => API.post("/api/users/save_itinerary", itineraryData);

export const fetchUserItineraries = async (userId) => {
  try {
    console.log("Fetching itineraries for userId:", userId);  // Debugging
    const response = await API.get(`/api/itineraries/info?userId=${encodeURIComponent(userId)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user itineraries:", error.response?.data || error);
    throw error;
  }
};

export const sendOtpAPI = async (formData) => {
  try {
    const response = await API.post("/api/users/send-otp", formData);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};


export const verifyOtpAPI = async (formData, otp) => {
  try {
    const response = await API.post("/api/users/verify-otp", { ...formData, otp });
    return response.data;
  } catch (error) {
    console.error("OTP Verification Error:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Invalid OTP");
  }
};

export default API;
