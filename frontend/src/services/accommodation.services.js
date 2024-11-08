// services/AccommodationService.js

import axios from "axios";

const AccommodationService = {
    fetchAccommodationInfo: async () => {
      try {
        const response = await axios.get("http://localhost:0987/api/accommodationinformation");
        console.log("Fetched Data:", response.data); // This will log in the browser console
        return response.data;
      } catch (error) {
        console.error("Error fetching accommodation information:", error);
        throw error;
      }
    },
  };
  
  
export default AccommodationService;
