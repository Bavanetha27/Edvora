import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mypath.css"; // Import external CSS

const MyPath = () => {
  const [careerPath, setCareerPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);

  const username = localStorage.getItem("username") || "User";
  const specialization = localStorage.getItem("specialization") || "Not Set";

  useEffect(() => {
    const fetchCareerPath = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get("https://skillsync-8z4m.onrender.com/mypath",{
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data.data);
        setCareerPath(response.data.data);
      } catch (err) {
        console.error("Error fetching career path:", err);
        setError("Failed to load career path");
      } finally {
        setLoading(false);
      }
    };

    fetchCareerPath();
  }, []);

  const handleLevelClick = (index) => {
    setSelectedLevel(careerPath[index]);
  };

  return (
    <div className="mypath-container mt-20">
      <h1 className="title">Here is your Career Path!</h1>
      <p className="subtitle">
        Explore your career path and complete the levels at your own pace!
      </p>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && careerPath.length > 0 && (
        <div className="level-path">
          {careerPath.map((item, index) => {
            const isLeft = index % 2 === 0; // Alternate left and right

            return (
              <div key={index} className="level-wrapper">
                {index !== 0 && <div className="connector"></div>}

                <button
                  onClick={() => handleLevelClick(index)}
                  className="level active w-24 h-24 text-center flex items-center justify-center overflow-hidden whitespace-nowrap truncate"
                >
                  Level {index+1}
                </button>

                {selectedLevel === item && (
                  <div className={`level-details ${isLeft ? "left" : "right"}`}>
                    <h3 className="level-title">Level: {item.level}</h3>
                    <p><strong>Specialization:</strong> {specialization}</p>
                    <p><strong>Lessons:</strong> {item.lessons.join(", ")}</p>
                    <p><strong>Course Name:</strong> {item.course_name?.join(", ") || "N/A"}</p>
                    {item.udemy?.length > 0 && (
                    <p>
                      <strong>Udemy:</strong> {item.udemy[0]}
                    </p>
                  )}

                  {item.coursera?.length > 0 && (
                    <p>
                      <strong>Coursera:</strong> {item.coursera[0]}
                    </p>
                  )}
                    <button className="complete-btn bg-red-500 text-white px-4 py-2 rounded-md">Completed</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
    </div>
  );
};

export default MyPath;
