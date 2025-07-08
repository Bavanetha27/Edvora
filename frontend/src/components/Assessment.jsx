import React from "react";
import nothing from "../assets/nothing.png"; 

const Assessment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img 
        src={nothing} 
        alt="Dashboard" 
        className="w-80 h-80 object-cover"
      />
    </div>
  );
};

export default Assessment
