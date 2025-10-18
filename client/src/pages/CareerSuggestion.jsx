import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const CareerSuggestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loadUser, logoutUser } = useContext(AuthContext);

  const [recommendation, setRecommendation] = useState(location.state?.recommendation || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!recommendation) {
        setLoading(true);
        try {
          const res = await API.get("/auth/dashboard"); // cookie sent automatically
          setRecommendation(res.data.latestRecommendation);

          // update user in context if not loaded
          if (!user) loadUser();
        } catch (err) {
          console.error(err);
          alert("Session expired or not logged in. Redirecting to login.");
          await logoutUser();
          navigate("/login");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecommendation();
  }, [recommendation, navigate, user, loadUser, logoutUser]);

  if (loading) return <div>Loading...</div>;
  if (!recommendation) return <div>No recommendation available yet. Take the quiz first.</div>;

  // If recommendation is a plain string
  if (typeof recommendation === "string") {
    return <pre>{recommendation}</pre>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Career Suggestions</h2>
      <pre className="bg-gray-100 p-2 rounded mb-4">{JSON.stringify(recommendation, null, 2)}</pre>

      {recommendation.top3 && (
        <div>
          {recommendation.top3.map((c, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded shadow-sm">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p><strong>Why:</strong> {c.why}</p>
              <p><strong>Key Skills:</strong> {Array.isArray(c.keySkills) ? c.keySkills.join(", ") : c.keySkills}</p>
              <p><strong>Roadmap:</strong></p>
              <ol className="list-decimal list-inside">
                {(c.roadmap || []).map((step, i) => <li key={i}>{step}</li>)}
              </ol>
              <p><strong>Sample Courses:</strong></p>
              <ul className="list-disc list-inside">
                {(c.sampleCourses || []).map((course, i) => <li key={i}>{course}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CareerSuggestion;