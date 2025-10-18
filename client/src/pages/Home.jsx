import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb, Compass, BookOpen } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">

      {/* ======= Hero Section ======= */}
      <div className="flex flex-col md:flex-row items-center justify-between flex-grow px-10 md:px-20 py-16">
        {/* Left Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-snug">
            Discover Your Ideal Career Path with <span className="text-blue-600">AI Guidance</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Take our smart aptitude and soft skill evaluations, and let Gemini AI recommend
            the best professions, learning paths, and skill-building opportunities for you.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all"
          >
            Start Your Journey
          </button>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://cdn.dribbble.com/users/25514/screenshots/14365663/media/8c50765ec1c731f82a631f3237b1bdb5.png"
            alt="Career Guidance"
            className="w-3/4 max-w-md rounded-3xl shadow-xl"
          />
        </motion.div>
      </div>

      {/* ======= Features Section ======= */}
      <section className="bg-white py-16 px-10 md:px-20 border-t border-gray-200">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose <span className="text-blue-600">CareerPathAI?</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 p-8 rounded-2xl shadow-md text-center"
          >
            <Lightbulb className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">AI-Powered Insights</h4>
            <p className="text-gray-600">
              Get personalized career recommendations powered by Google’s Gemini API.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 p-8 rounded-2xl shadow-md text-center"
          >
            <Compass className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Smart Assessments</h4>
            <p className="text-gray-600">
              Evaluate your aptitude and soft skills to uncover your hidden strengths.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 p-8 rounded-2xl shadow-md text-center"
          >
            <BookOpen className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Learning Roadmaps</h4>
            <p className="text-gray-600">
              Get curated learning paths and course recommendations to grow your skills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>© {new Date().getFullYear()} CareerPathAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
