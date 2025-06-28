import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaTrash } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import defaultProfile from "../assets/profile.jpeg";

const Profile = () => {
  const token = localStorage.getItem("token"); // Retrieve token
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    company: "",
    specialization: "",
    profilePic: defaultProfile, 
  });

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("https://skillsync-8z4m.onrender.com/profile", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfileData(res.data.user || {}); 
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [token]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value || "" });
  };

  const handleSaveChanges = () => {
    axios
      .put("https://skillsync-8z4m.onrender.com/profile", profileData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete("https://skillsync-8z4m.onrender.com/profile", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Account deleted successfully!");
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
          navigate("/");
        })
        .catch((err) => {
          console.error("Error deleting account:", err);
        });
    }
  };

  // Profile Picture Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white mt-16 shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <img
              src={profileData.profilePic || defaultProfile}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
            <label className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <h2 className="text-2xl font-semibold mt-4">{profileData.username || "User"}</h2>
        </div>

        {/* Editable Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email || ""}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Company</label>
            <input
              type="text"
              name="company"
              value={profileData.company || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Expertise</label>
            <input
              type="text"
              name="specialization"
              value={profileData.specialization || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
            onClick={handleDeleteAccount}
          >
            <FaTrash /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
