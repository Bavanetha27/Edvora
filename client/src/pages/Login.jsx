import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.png";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUserDetails } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form, {
        withCredentials: true,
      });
      setUserDetails(res.data.user);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left side image */}
        <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-8">
          <div className="text-center text-white space-y-6">
            <img
              src={loginImg}
              alt="Login Illustration"
              className="w-40 mx-auto animate-bounce"
            />
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-blue-100 text-lg">
              Sign in to continue your personalized career journey.
            </p>
          </div>
        </div>

        {/* Right side login form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              className="text-purple-600 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
