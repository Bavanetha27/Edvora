import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import navp from "../assets/profile.jpeg"; 

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState(""); 

  // Check if user is logged in
  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile();
    }
  }, [isLoggedIn]);

  const getUserProfile = async () => {
    try {
      const res = await axios.get("https://skillsync-8z4m.onrender.com/json",{
        headers: { Authorization: `Bearer ${user}` }
        
    });
      setUsername(res.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[81px] flex items-center px-8 justify-between">
      {/* Logo */}
      <p className="text-3xl font-semibold">
        <span className="text-black">Skill</span>
        <span className="text-blue-700">Sync</span>
      </p>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8 text-xl font-semibold">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/mypath" className="hover:text-blue-500">My Path</Link>
        <Link to="/ass" className="hover:text-blue-500">Assessment</Link>
        <Link to="/contact" className="hover:text-blue-500">Contact</Link>

        {/* Conditional Rendering for Authentication */}
        {isLoggedIn ? (
          <div 
            className="relative cursor-pointer" 
            onMouseEnter={() => setDropdown(true)} 
            onMouseLeave={() => setDropdown(false)}
          >
            <img className="w-[45px] h-[45px] object-cover rounded-full" alt="Profile" src={navp} />

            {dropdown && (
              <ul className="absolute top-full right-0 text-xl bg-gray-200 border border-gray-300 rounded-lg w-[150px] py-2 shadow-md z-10">
                <li className="px-4 py-2 hover:bg-gray-300">
                  <Link to="/profile" className="hover:text-blue-500">Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-300">
                  <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-300">
                  <button onClick={handleLogout} className="w-full text-left hover:text-blue-500">Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="px-4 py-1 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
