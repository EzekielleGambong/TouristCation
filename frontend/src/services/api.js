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

export default API;
