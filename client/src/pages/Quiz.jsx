import React, { useState, useContext } from 'react';
import SectionCards from '../components/SectionCards';
import QuestionList from '../components/QuestionList';
import API from '../services/api';
import { AuthContext } from "../context/AuthContext";

const Quiz = () => {
  const { user } = useContext(AuthContext); // get user from context
  const [activeSection, setActiveSection] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scoreModal, setScoreModal] = useState(null);

  const handleCardClick = async ({ section, cardKey }) => {
    setActiveSection(section);
    setActiveCard(cardKey);
    setLoading(true);
    try {
      const resp = await API.get(`/quiz/questions`, { params: { section, card: cardKey } });
      setQuestions(resp.data.questions || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load questions. Try again later.');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSections = () => {
    setActiveSection(null);
    setActiveCard(null);
    setQuestions([]);
    setScoreModal(null);
  };

  const handleSubmitQuiz = async (answers) => {
    console.log('Current user state:', user); // Debug log
    if (!user?.id) {
      console.log('User ID missing in context'); // Debug log
      alert("User not logged in");
      return;
    }

    try {
      const payload = {
        userId: user.id, // use user id from context
        [activeSection]: {
          [activeCard]: answers,
        },
      };

      const resp = await API.post('/quiz/submit', payload, { withCredentials: true });
      const saved = resp.data.quizResult;

      // calculate score
      let correct = 0;
      questions.forEach((q) => {
        if (q.answerIndex !== undefined) {
          const selected = answers[q.id];
          if (selected === q.options[q.answerIndex]) correct += 1;
        }
      });

      setScoreModal({ score: correct, total: questions.length });
    } catch (err) {
      console.error(err);
      alert('Failed to submit quiz.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 md:p-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Assessments</h1>

        {!activeSection && <SectionCards onCardClick={handleCardClick} />}

        {activeSection && (
          <div className="mt-8">
            <button onClick={handleBackToSections} className="text-purple-600 hover:underline mb-4">
              ← Back to categories
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {activeSection === 'aptitude' ? 'Aptitude' : 'Soft Skills'} — {activeCard}
            </h2>

            <QuestionList questions={questions} loading={loading} onSubmit={handleSubmitQuiz} />
          </div>
        )}

        {/* Score Modal */}
        {scoreModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-xl text-center shadow-xl max-w-sm">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-lg mb-4">
                You scored {scoreModal.score} out of {scoreModal.total}
              </p>
              <button
                onClick={() => setScoreModal(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
