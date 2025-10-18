import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in by calling dashboard endpoint
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await API.get("/auth/dashboard"); // cookie is sent automatically
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout"); // clear cookie
      setUser(null); // reset state
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  const handleProtectedClick = (path) => {
    if (!user) {
      alert("Please log in to access this feature!");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  if (loading) return null; 

  return (
    <nav className="flex justify-between items-center bg-white shadow-md px-8 py-4 sticky top-0 z-50">
      {/* Brand Name */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Career<span className="text-gray-800">Path</span>AI
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6 text-gray-700 font-medium flex items-center">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        {/* Show these only when NOT logged in */}
        {!user && (
          <>
            <Link to="/signup" className="hover:text-blue-600 transition">
              Signup
            </Link>
            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>
          </>
        )}

        {/* Protected routes only visible when logged in */}
        {user && (
          <>
            <button
              onClick={() => handleProtectedClick("/quiz")}
              className="hover:text-blue-600 transition"
            >
              Quiz
            </button>

            <button
              onClick={() => handleProtectedClick("/suggestion")}
              className="hover:text-blue-600 transition"
            >
              Suggestion
            </button>

            <button
              onClick={() => handleProtectedClick("/dashboard")}
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </button>
          </>
        )}
      </div>

      {/* Logout Button (only if logged in) */}
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
