import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await API.get("/auth/dashboard"); 
        setData(res.data);
        if (!user) setUser(res.data.user);
      } catch (err) {
        console.error(err);
        alert("Session expired or not logged in. Redirecting to login.");
        await logoutUser(); // clear context and cookies
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate, setUser, user, logoutUser]);

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>No data available.</div>;

  const { user: userData, progress, latestRecommendation, quizHistory } = data;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Role:</strong> {userData.role} | <strong>Domain:</strong> {userData.domain} | <strong>Experience:</strong> {userData.experience} yrs
      </p>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Progress</h3>
        <progress value={progress} max="100" className="w-full" />
        <div>{progress}%</div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Latest Recommendation</h3>
        {latestRecommendation ? (
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(latestRecommendation, null, 2)}</pre>
        ) : (
          <div>No recommendation yet.</div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Quiz History</h3>
        {quizHistory && quizHistory.length ? (
          quizHistory.slice().reverse().map((q, i) => (
            <div key={i} className="border p-2 mb-2 rounded">
              <div><strong>Date:</strong> {new Date(q.createdAt).toLocaleString()}</div>
              <div><strong>Aptitude:</strong> {JSON.stringify(q.aptitude)}</div>
              <div><strong>SoftSkills:</strong> {JSON.stringify(q.softSkills)}</div>
              <div><strong>Recommendation:</strong> <pre>{JSON.stringify(q.recommendation, null, 2)}</pre></div>
            </div>
          ))
        ) : (
          <div>No quiz history yet.</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;