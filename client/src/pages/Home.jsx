import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb, Compass, BookOpen, Brain, Rocket, Users, Code, Stethoscope, Briefcase, Palette } from "lucide-react";
import hero from "../assets/hero.png";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col">

    {/* ===== Hero Section ===== */}
    <div className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 md:px-20 py-16">
      <motion.div
        className="md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
          Discover Your Ideal Career Path with{" "}
          <span className="text-purple-600">AI Guidance</span>
        </h2>
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
          Take our smart aptitude and soft skill evaluations, and let{" "}
          <span className="font-semibold text-purple-500">Gemini AI</span> recommend
          the best professions, learning paths, and skill-building opportunities for you.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signup")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3.5 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl"
        >
          Start Your Journey
        </motion.button>
      </motion.div>

      <motion.div
        className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={hero}
          alt="Career Guidance"
          className="w-4/5 md:w-[90%] max-w-lg rounded-3xl hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </div>


      {/* ===== Features Section ===== */}
      <section className="bg-white py-20 px-8 md:px-20 border-t border-gray-200">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
          Why Choose <span className="text-purple-600">Edvora?</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: Lightbulb,
              title: "AI-Powered Insights",
              desc: "Get personalized career recommendations powered by Google’s Gemini API.",
            },
            {
              icon: Compass,
              title: "Smart Assessments",
              desc: "Evaluate your aptitude and soft skills to uncover your hidden strengths.",
            },
            {
              icon: BookOpen,
              title: "Learning Roadmaps",
              desc: "Get curated learning paths and course recommendations to grow your skills.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-md text-center border border-purple-100"
            >
              <feature.icon className="w-12 h-12 mx-auto text-purple-600 mb-5" />
              <h4 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section className="bg-gradient-to-r from-purple-100 to-purple-50 py-20 px-8 md:px-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
          How It <span className="text-purple-600">Works</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: Brain, title: "1. Take the Assessment", desc: "Answer questions to evaluate your skills, interests, and personality." },
            { icon: Rocket, title: "2. Get AI Analysis", desc: "Our AI analyzes your responses and identifies ideal career paths." },
            { icon: Users, title: "3. Explore and Learn", desc: "View personalized recommendations, courses, and skill paths." },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-md text-center border border-purple-100"
            >
              <step.icon className="w-12 h-12 mx-auto text-purple-600 mb-5" />
              <h4 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h4>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Career Categories Section ===== */}
      <section className="bg-white py-20 px-8 md:px-20 border-t border-gray-200">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
          Explore <span className="text-purple-600">Career Fields</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            { icon: Code, name: "Technology" },
            { icon: Stethoscope, name: "Healthcare" },
            { icon: Briefcase, name: "Business" },
            { icon: Palette, name: "Design" },
            { icon: Brain, name: "Research" },
          ].map((career, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -5 }}
              className="p-6 bg-purple-50 rounded-xl shadow-sm border border-purple-100"
            >
              <career.icon className="w-10 h-10 mx-auto text-purple-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-800">{career.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-20 px-8 md:px-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
          What Our <span className="text-purple-600">Users Say</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Aarav K.", text: "CareerPathAI helped me discover my passion for design. The AI insights were spot-on!" },
            { name: "Neha R.", text: "The aptitude test and personalized recommendations really changed my career direction." },
            { name: "Rahul M.", text: "A great platform! It’s like having a personal mentor guiding your career path." },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-purple-100 text-center"
            >
              <p className="text-gray-600 italic mb-4">“{t.text}”</p>
              <h4 className="text-lg font-semibold text-purple-700">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-16 px-8 md:px-20 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Shape Your Future?
        </motion.h3>
        <p className="text-lg mb-8 text-purple-100">
          Take the first step towards a successful and fulfilling career today!
        </p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signup")}
          className="bg-white text-purple-700 px-10 py-3.5 rounded-full text-lg font-semibold shadow-md hover:bg-purple-100 transition-all duration-300"
        >
          Get Started
        </motion.button>
      </section>
    </div>
  );
}
