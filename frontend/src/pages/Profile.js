import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2, Edit, Trash2 } from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin text-gray-500 w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
        {/* Profile Section */}
        <Card className="col-span-1 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-blue-500 text-white p-6 flex flex-col items-center">
            <img
              src={profile.avatar || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
            <p className="text-sm opacity-90">{profile.email}</p>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 text-lg mb-4">
              Gender: <span className="font-semibold text-blue-600">{profile.gender}</span>
            </p>
            <p className="text-gray-700 text-lg mb-4">
              Date of Birth: <span className="font-semibold text-blue-600">{profile.dob}</span>
            </p>
          </CardContent>
        </Card>

        {/* Company Details Section */}
        <CardContent className="p-4 md:grid md:grid-cols-2 gap-6">
  <Card className="shadow-md p-4 rounded-lg">
    <CardHeader className="text-lg font-semibold mb-4">Company Information</CardHeader>
    {profile?.company ? (
      <div>
        <p>
          <span className="font-bold">Company Name: </span>
          {profile.company.name || "N/A"}
        </p>
        <p>
          <span className="font-bold">Company Website: </span>
          {profile.company.website || "N/A"}
        </p>
        <p>
          <span className="font-bold">Description: </span>
          {profile.company.description || "N/A"}
        </p>
        <p>
          <span className="font-bold">Serial Code: </span>
          {profile.company.serial || "N/A"}
        </p>
      </div>
    ) : (
      <p>No company information available.</p>
    )}
  </Card>
  {/* Address Section */}
  <Card className="shadow-md p-4 rounded-lg">
    <CardHeader className="text-lg font-semibold mb-4">Company Address</CardHeader>
    {profile?.company?.address ? (
      <div>
        <p>
          <span className="font-bold">Country: </span>
          {profile.company.address.country || "N/A"}
        </p>
        <p>
          <span className="font-bold">State: </span>
          {profile.company.address.state || "N/A"}
        </p>
        <p>
          <span className="font-bold">City: </span>
          {profile.company.address.city || "N/A"}
        </p>
        <p>
          <span className="font-bold">Zip Code: </span>
          {profile.company.address.zipCode || "N/A"}
        </p>
        <p>
          <span className="font-bold">Street Address: </span>
          {profile.company.address.street || "N/A"}
        </p>
      </div>
    ) : (
      <p>No address information available.</p>
    )}
  </Card>
</CardContent>


        {/* Product Section */}
<Card className="col-span-1 lg:col-span-2 shadow-lg rounded-xl overflow-hidden">
  <CardHeader className="bg-gray-800 text-white p-6">
    <CardTitle className="text-xl font-semibold">Products</CardTitle>
  </CardHeader>
  <CardContent className="p-6">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Product Category</th>
            <th className="p-3">Sub Category</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(profile?.products) && profile.products.length > 0 ? (
            profile.products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{product.category || "N/A"}</td>
                <td className="p-3">{product.subCategory || "N/A"}</td>
                <td className="p-3">{product.date || "N/A"}</td>
                <td className="p-3 text-center">
                  <Button variant="ghost" className="p-1">
                    <Edit className="w-5 h-5 text-blue-500" />
                  </Button>
                  <Button variant="ghost" className="p-1">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>


        {/* Logout Section */}
        <div className="col-span-1 lg:col-span-2 flex justify-end mt-4">
          <Button onClick={handleLogout} className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
