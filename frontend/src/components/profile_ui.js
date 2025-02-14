import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2, Edit, Trash2 } from "lucide-react";
import { updateProfile } from "../services/api";
import { uploadImage } from "../services/api";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  

  const handleSave = async () => {
    try {
      await updateProfile(profile); // Send updated profile data to the backend
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleSavePreferences = () => {
    setIsEditingPreferences(false);
    // Here you would typically send the updated preferences to the backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [name]: type === 'checkbox' ? checked : value,
      },
    });
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("photo", file);
  
    try {
      const response = await uploadImage(formData);
      const data = response.data;
      
      setProfile((prev) => ({ ...prev, photo: data.user.photo }));
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile({
          ...data,
          preferences: data.preferences || { theme: "Light", notifications: false, language: "English" },
        });
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

  const handleHome = () => {
    navigate("/page/home");
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin text-gray-500 w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">User Profile</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-300"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Profile Photo */}
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fname"
                      value={profile.fname}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="lname"
                      value={profile.lname}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="Last Name"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="Phone"
                    />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="region"
                      value={profile.region}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="Province"
                    />
                    <input
                      type="text"
                      name="country"
                      value={profile.country}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="Country"
                    />
                    <input
                      type="text"
                      name="zip"
                      value={profile.zip}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 border rounded-lg"
                      placeholder="ZIP"
                    />
                  </div>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full p-2 mb-4 border rounded-lg"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{profile.fname} {profile.lname}</h2>
                  <p className="text-gray-600">{profile.role} </p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Account Created:</strong> {profile.createdAt}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Address:</strong> {profile.address}, {profile.city}, {profile.province}, {profile.country}, {profile.zip}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleHome}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Go Back Home
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* User Preferences Card */}
        <div className="p-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Preferences</h3>
              <button
                onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {isEditingPreferences ? 'Cancel' : 'Edit Preferences'}
              </button>
            </div>
            {isEditingPreferences ? (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Theme</label>
                  <select
                    name="theme"
                    value={profile.preferences?.theme || "Light"}
                    onChange={handlePreferenceChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notifications</label>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={profile.preferences.notifications}
                    onChange={handlePreferenceChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Language</label>
                  <select
                    name="language"
                    value={profile.preferences.language}
                    onChange={handlePreferenceChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
                <button
                  onClick={handleSavePreferences}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Preferences
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <p><strong>Theme:</strong> {profile.preferences.theme}</p>
                <p><strong>Notifications:</strong> {profile.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
                <p><strong>Language:</strong> {profile.preferences.language}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;