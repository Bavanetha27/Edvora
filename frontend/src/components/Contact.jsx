import React from "react";
import contact from "../assets/contact.png";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">

        {/* left Section*/}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions? Feel free to reach out to us!
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                placeholder="Write your message..."
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button className="w-full bg-teal-700 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition">
              Send Message
            </button>
          </form>
        </div>
        {/* Right Section */}
        <div className="relative">
          <img
            src={contact}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
