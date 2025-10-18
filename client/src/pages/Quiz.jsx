import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const aptitudeQuestions = [
  { key: "logic", label: "Logical reasoning" },
  { key: "math", label: "Mathematics / Problem solving" },
  { key: "visual", label: "Visual / Spatial ability" },
];

const softQuestions = [
  { key: "communication", label: "Communication" },
  { key: "teamwork", label: "Teamwork" },
  { key: "creativity", label: "Creativity" },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [aptitude, setAptitude] = useState({ logic: 5, math: 5, visual: 5 });
  const [softSkills, setSoftSkills] = useState({ communication: 5, teamwork: 5, creativity: 5 });
  const [loading, setLoading] = useState(false);

  const handleApt = (key, value) => setAptitude({ ...aptitude, [key]: Number(value) });
  const handleSoft = (key, value) => setSoftSkills({ ...softSkills, [key]: Number(value) });

  const submitQuiz = async () => {
    setLoading(true);
    try {
      // Submit quiz
      await API.post("/quiz/submit", { aptitude, softSkills }, { withCredentials: true });
      // Call AI for career suggestions
      const aiRes = await API.post("/ai/suggest-career", { aptitude, softSkills }, { withCredentials: true });

      alert("Recommendation saved! Redirecting to suggestion page.");
      navigate("/suggestion", { state: { recommendation: aiRes.data.recommendation } });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Quiz submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Aptitude & Soft Skills Evaluation</h2>

      <div className="grid gap-8">
        <section>
          <h3 className="text-xl font-semibold mb-4">Aptitude</h3>
          {aptitudeQuestions.map(q => (
            <div key={q.key} className="mb-4">
              <label className="block mb-1">{q.label} (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={aptitude[q.key]}
                onChange={(e) => handleApt(q.key, e.target.value)}
                className="w-full"
              />
              <div className="text-sm mt-1">Score: {aptitude[q.key]}</div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
          {softQuestions.map(q => (
            <div key={q.key} className="mb-4">
              <label className="block mb-1">{q.label} (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={softSkills[q.key]}
                onChange={(e) => handleSoft(q.key, e.target.value)}
                className="w-full"
              />
              <div className="text-sm mt-1">Score: {softSkills[q.key]}</div>
            </div>
          ))}
        </section>

        <button
          onClick={submitQuiz}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          {loading ? "Submitting..." : "Submit & Get Suggestions"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;