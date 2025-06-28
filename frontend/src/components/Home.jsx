import React,{ useState,useEffect } from "react";
import Nav from "./Nav.jsx"

import "./Home.css"; // Importing the CSS file
import hero from "../assets/Hero.png"
import about from "../assets/about.png"
import f1 from "../assets/f1.png"
import f2 from "../assets/f2.png"
import f3 from "../assets/f3.png"
import f4 from "../assets/f4.png"
import f5 from "../assets/f5.png"
import f6 from "../assets/f6.png"

import AOS from "aos";
import "aos/dist/aos.css";


const Home = () => {
  
    useEffect(() => {
        AOS.init({
          duration: 2000,  
          once: false,      
          mirror: true,     
        });
      }, []);

  return (
    <div className="bg-white flex justify-center w-full">
      <div className="w-full min-h-screen relative">
        {/* Hero Section */}
        <div className="relative w-full h-[697px] overflow-hidden flex items-center justify-center">
          <img className="absolute w-full h-full object-cover" src={hero} alt="Hero" />
          <p className="relative text-5xl leading-relaxed font-semibold text-black text-center max-w-6xl">
            Unlock your potential, ignite your mind, and shape your future through learning!
          </p>
          <button className="hero-button">Explore!</button>
          <Nav />
        </div>

        {/* About Section */}
        <div 
        className="flex flex-col md:flex-row items-center justify-between text-center py-16 px-8"
        data-aos="fade-up"
        >
            <div className="md:w-1/2 space-y-6">
                <h2 className="text-5xl font-semibold text-blue-700">
                Empowering Careers with AI-Driven Insights!
                </h2>
                <p className="text-3xl text-black">
                Choosing the right career path can be overwhelming. That’s why we use AI-powered technology
                to provide personalized career guidance, helping you make informed decisions with confidence.
                </p>
                <button className="career-button">Start your journey today!</button>
            </div>
            <div className="md:w-1/2 flex justify-end">
                <img 
                className="w-[600px] h-[540px] object-cover"
                alt="Element" 
                src={about} 
                data-aos="fade-up"  
                />
            </div>
        </div>



        {/* Features Section */}
        <div className="bg-neutral-100 py-16 mx-5 rounded-md" data-aos="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center mx-auto max-w-5xl">
                <div className="feature-box" data-aos="zoom-in">
                <img src={f1} className="w-[300px] h-[300px] mx-auto object-contain" alt="AI-Based Career Suggestions" />
                <p className="mt-4 text-lg font-medium">AI-Based Career Suggestions</p>
                </div>
                <div className="feature-box" data-aos="zoom-in">
                <img src={f2} className="w-[250px] h-[250px] mx-auto object-contain" alt="Aptitude & Skills Testing" />
                <p className="mt-4 text-lg font-medium">Aptitude & Skills Testing</p>
                </div>
                <div className="feature-box" data-aos="zoom-in">
                <img src={f3} className="w-[250px] h-[250px] mx-auto object-contain" alt="Career Growth Roadmap" />
                <p className="mt-4 text-lg font-medium">Career Growth Roadmap</p>
                </div>
                <div className="feature-box " data-aos="zoom-in">
                <img src={f4} className="w-[250px] h-[250px] mx-auto object-contain" alt="Learning Gap Analysis" />
                <p className="mt-4 text-lg font-medium">Learning Gap Analysis</p>
                </div>
                <div className="feature-box " data-aos="zoom-in">
                <img src={f5} className="w-[250px] h-[250px] mx-auto object-contain" alt="Career Predictive Analytics" />
                <p className="mt-4 text-lg font-medium">Career Predictive Analytics</p>
                </div>
                <div className="feature-box" data-aos="zoom-in">
                <img src={f6} className="w-[250px] h-[250px] mx-auto object-contain" alt="Career Predictive Analytics" />
                <p className="mt-4 text-lg font-medium">Job Suggestions</p>
                </div>
            </div>
        </div>


        {/* Call to Action */}
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold">Take the First Step Towards Your Dream Career!</h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Discover personalized career recommendations tailored to your skills, interests, and aspirations.
            Let AI guide you towards a successful and fulfilling career path.
          </p>
          <button className="join-button">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
