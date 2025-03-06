import axios from "axios";

const API = axios.create({ baseURL: "https://www.toursitcation.site" });

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

export default API;
