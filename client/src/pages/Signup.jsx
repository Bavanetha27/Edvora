import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/signup.png";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    experience: 0,
    domain: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/signup", form,);
      alert("Signup successful!");
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left side image section */}
        <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-8">
          <div className="text-center text-white space-y-6">
            <img
              src={signupImg}
              alt="Career Guidance"
              className="w-40 mx-auto animate-bounce"
            />
            <h1 className="text-3xl font-bold">Shape Your Future</h1>
            <p className="text-blue-100 text-lg">
              Discover your ideal career path through aptitude and soft skill insights.
            </p>
          </div>
        </div>

        {/* Right side form section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

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

            <div className="grid grid-cols-2 gap-4">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              >
                <option>Student</option>
                <option>Professional</option>
              </select>

              <input
                name="experience"
                type="number"
                placeholder="Experience (years)"
                value={form.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <input
              name="domain"
              placeholder="Domain (e.g., Software, Marketing)"
              value={form.domain}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              className="text-purple-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
