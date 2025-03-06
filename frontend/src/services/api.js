import axios from "axios";

const API = axios.create({ baseURL: "https://www.toursitcation.site/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("Token in interceptor:", token);
  if (token && !req.url.includes("/users/signup") && !req.url.includes("/users/login")) {
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
export const loginUser = (formData) => API.post("/users/login", formData);
export const signupUser = (formData) => API.post("/users/signup", formData);
export const fetchProfile = () => API.get("/users/profile");
export const fetchAdminData = () => API.get("/users/admin-data");
export const updateProfile = (updatedProfile) => API.put("/users/profile", updatedProfile);


export const fetchTotalUsers = async () => {
  const response = await API.get("/users/total-users");
  return response.data;
};

export const fetchTotalTourist = async () => {
  const response = await API.get("/users/total-tourist");
  return response.data;
};

export const fetchTotalAccommodations = async () => {
  const response = await API.get("/users/total-acco");
  return response.data;
};

export const addTouristSpot = (formData) => API.post("/touristspots/add", formData);
export const addAccomodation = (accommodationData) => API.post("/accommodation/add", accommodationData);

export default API;
