import React, { useEffect, useState } from "react";
import {addAccomodation  } from "../services/api"; 
import axios from "axios";

function Adminform() {

  const [formData, setFormData] = useState({
    establishmentId: "",
    nameOfEstablishment: "",
    province: "",
    city: "",
    address: "",
    aeStatus: "",
    aeType: "",
    mainType: "",
    subCategory: "",
    contactNumber: "",
    emailAddress: "",
    facebookPage: "",
    room: "",
    pax: "",
    price: "",
    booking: "",
    agoda: "",
    googleTravel: "",
    coordinates: "",
    description: "",
    link: "",
    type: "",
  });
  

  useEffect(() => {
    
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAccomodation(formData);
      alert("Attraction added successfully!");
      setFormData({
        establishmentId: "",
        nameOfEstablishment: "",
        province: "",
        city: "",
        address: "",
        aeStatus: "",
        aeType: "",
        mainType: "",
        subCategory: "",
        contactNumber: "",
        emailAddress: "",
        facebookPage: "",
        room: "",
        pax: "",
        price: "",
        booking: "",
        agoda: "",
        googleTravel: "",
        coordinates: "",
        description: "",
        link: "",
        type: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add accommodation.");
    }
  };

  return (
    <div >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Add New Accommodation</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="establishmentId"
            placeholder="Establishment ID"
            value={formData.establishmentId}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="nameOfEstablishment"
            placeholder="Name of Establishment"
            value={formData.nameOfEstablishment}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="province"
            placeholder="Province"
            value={formData.province}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="aeStatus"
            placeholder="AE Status"
            value={formData.aeStatus}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="aeType"
            placeholder="AE Type"
            value={formData.aeType}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="mainType"
            placeholder="Main Type"
            value={formData.mainType}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="subCategory"
            placeholder="Sub Category"
            value={formData.subCategory}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="facebookPage"
            placeholder="Facebook Page"
            value={formData.facebookPage}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="room"
            placeholder="Room Type"
            value={formData.room}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="pax"
            placeholder="Pax"
            value={formData.pax}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="booking"
            placeholder="Booking Link"
            value={formData.booking}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="agoda"
            placeholder="Agoda Link"
            value={formData.agoda}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="googleTravel"
            placeholder="Google Travel Link"
            value={formData.googleTravel}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="coordinates"
            placeholder="Location Coordinates"
            value={formData.coordinates}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
            required
          />
          <input
            type="text"
            name="link"
            placeholder="Website Link"
            value={formData.link}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
            required
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition col-span-1 md:col-span-2"
          >
            Add Accommodation
          </button>
        </form>
      
    </div>
  );
}

export default Adminform;
