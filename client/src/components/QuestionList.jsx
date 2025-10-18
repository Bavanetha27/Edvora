import React, { useState } from 'react';

export default function QuestionList({ questions, loading, onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(answers);
  };

  if (loading) return <p>Loading questions...</p>;
  if (!questions || questions.length === 0) return <p>No questions found.</p>;

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div key={q.id} className="p-4 border rounded-lg bg-purple-50">
          <p className="font-semibold mb-2">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleSelect(q.id, opt)}
                  className="accent-purple-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Submit Quiz
      </button>
    </div>
  );
}
