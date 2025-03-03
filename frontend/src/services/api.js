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
<<<<<<< HEAD
export const loginUser = (formData) => API.post("/api/users/login", formData);
export const signupUser = (formData) => API.post("/api/users/signup", formData);
export const fetchProfile = () => API.get("/api/users/profile");
export const fetchAdminData = () => API.get("/api/users/admin-data");
export const updateProfile = (updatedProfile) => API.put("/api/users/profile", updatedProfile);
=======
export const loginUser = (formData) => API.post("/users/login", formData);
export const signupUser = (formData) => API.post("/users/signup", formData);
export const fetchAdminData = () => API.get("/users/admin-data");

//travelstyle
export const updateProfile = (updatedProfile) => API.put("/users/profile", updatedProfile);
export const fetchProfile = () => API.get("/users/profile");

export const updatesProfile = async (updatedData) => {
  try {
      const response = await API.put("/users/profile", updatedData);
      return response.data;
  } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
  }
};
>>>>>>> origin/Feb.16

export default API;
