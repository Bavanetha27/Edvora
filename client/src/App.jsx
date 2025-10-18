import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import CareerSuggestion from "./pages/CareerSuggestion";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/suggestion" element={<CareerSuggestion />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
