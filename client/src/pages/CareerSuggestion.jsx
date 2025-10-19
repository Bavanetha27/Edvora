import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CareerSuggestion = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to see career suggestions.");
      logoutUser();
      navigate("/login");
      return;
    }

    if (user.recommendation?.text) {
      try {
        // Remove backticks and optional language identifier (like ```json)
        const cleanedText = user.recommendation.text
          .replace(/^```json\s*/, "")
          .replace(/```$/, "")
          .trim();

        const parsedRecommendation = JSON.parse(cleanedText);
        setRecommendation(parsedRecommendation);
      } catch (err) {
        console.error("Failed to parse recommendation JSON:", err);
        setRecommendation(null);
      }
    }
  }, [user, navigate, logoutUser]);


  if (!user) return null; // optional: show nothing while redirecting
  if (!recommendation) return <div>No recommendation available yet.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Career Suggestions</h2>

      {(recommendation.top5 || recommendation.top3) && (
        <div>
          {(recommendation.top5 || recommendation.top3).map((c, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded shadow-sm">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p><strong>Why:</strong> {c.why}</p>
              <p>
                <strong>Key Skills:</strong>{" "}
                {Array.isArray(c.keySkills) ? c.keySkills.join(", ") : c.keySkills}
              </p>

              <p><strong>Roadmap:</strong></p>
              <ol className="list-decimal list-inside">
                {(c.roadmap || []).map((step, i) => <li key={i}>{step}</li>)}
              </ol>

              <p><strong>Courses:</strong></p>
              <ul className="list-disc list-inside">
                {(c.courses || []).map((course, i) => (
                  <li key={i}>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {course.name} ({course.platform})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {recommendation.recommendedAssessment && (
        <div className="mt-6 p-4 bg-blue-50 border rounded">
          <h4 className="font-semibold">Next Step:</h4>
          <p>{recommendation.recommendedAssessment}</p>
        </div>
      )}
    </div>
  );
};

export default CareerSuggestion;
