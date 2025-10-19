import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await API.get("/auth/dashboard");
        const userData = res.data.user;

        if (!user) setUser(userData);

        // Parse recommendation safely
        if (userData.recommendation?.text) {
          try {
            let recText = userData.recommendation.text;
            // Remove ```json at start and ``` at end
            recText = recText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
            const rec = JSON.parse(recText);
            setRecommendation(rec);
          } catch (err) {
            console.error("Failed to parse recommendation:", err);
            setRecommendation(null);
          }
        }
      } catch (err) {
        console.error(err);
        alert("Session expired or not logged in. Redirecting to login.");
        await logoutUser();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate, setUser, logoutUser, user]);
  console.log(user)
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data available.</div>;

  const progress = user.quizResults?.length ? 100 : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Role:</strong> {user.role} | <strong>Domain:</strong> {user.domain} | <strong>Experience:</strong> {user.experience} yrs
      </p>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Progress</h3>
        <progress value={progress} max="100" className="w-full" />
        <div>{progress}%</div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Career Recommendation</h3>
        {recommendation ? (
          <div>
            {(recommendation.top5 || recommendation.top3)?.map((c, idx) => (
              <div key={idx} className="border p-4 mb-4 rounded shadow-sm">
                <h4 className="text-lg font-semibold">{c.title}</h4>
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

            {recommendation.recommendedAssessment && (
              <div className="mt-4 p-4 bg-blue-50 border rounded">
                <h4 className="font-semibold">Next Step:</h4>
                <p>{recommendation.recommendedAssessment}</p>
              </div>
            )}
          </div>
        ) : (
          <div>No recommendation available yet.</div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Quiz History</h3>
        {user.quizResults && user.quizResults.length ? (
          user.quizResults.slice().reverse().map((q, i) => (
            <div key={i} className="border p-2 mb-2 rounded">
              <div><strong>Date:</strong> {new Date(q.createdAt).toLocaleString()}</div>
              <div><strong>Aptitude:</strong> {JSON.stringify(q.aptitude)}</div>
              <div><strong>SoftSkills:</strong> {JSON.stringify(q.softSkills)}</div>
            </div>
          ))
        ) : (
          <div>No quiz history yet.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
