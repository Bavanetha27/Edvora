const User = require("../models/User");
const { generateQuestions } = require("../services/geminiService");

/**
 * GET /quiz/questions?section=aptitude&card=logic
 */
const getQuestionsForCard = async (req, res) => {
  try {
    const { section, card } = req.query;
    if (!section || !card) {
      return res.status(400).json({ message: "section and card are required" });
    }

    const prompt = buildPrompt({ section, card, numQuestions: 10 });

    // Call Gemini API service
    const questions = await generateQuestions(prompt);

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ message: "Failed to generate questions" });
    }

    return res.status(200).json({ success: true, questions });
  } catch (err) {
    console.error("Controller error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

function buildPrompt({ section, card, numQuestions }) {
  return `
You are an educational assessment generator.
Produce exactly ${numQuestions} multiple-choice questions (MCQs) for undergraduate students.
Return only a JSON array of objects, each with the following keys:
{
  "id": "<unique short id>",
  "question": "<question text>",
  "type": "mcq",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answerIndex": <0, 1, 2, or 3 indicating the correct option>
}
Context:
- Section: ${section}
- Topic/Card: ${card}
Requirements:
- Each MCQ must have exactly 4 options.
- Provide the correct answer index in "answerIndex".
- Do NOT include any explanations or extra text—return only the JSON array.
- Use simple language suitable for undergraduate students.
`;
}

/**
 * POST /quiz/submit
 * Body: { section: "aptitude" | "softSkills", score, userId }
 */
const submitQuiz = async (req, res) => {
  try {
    const { userId, section, score } = req.body;

    // Validate payload
    if (!userId || !section || score === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create section score
    const sectionScore = { score, date: new Date() };

    // Create a new quiz result for this attempt
    const newQuizResult = {
      aptitude: section === "aptitude" ? sectionScore : null,
      softSkills: section === "softSkills" ? sectionScore : null,
      recommendation: null,
      createdAt: new Date(),
    };

    // Add to user's quizResults array
    user.quizResults.push(newQuizResult);

    // Save user
    await user.save();

    return res.status(201).json({
      message: `${section} score saved successfully`,
      quizResult: newQuizResult,
    });
  } catch (err) {
    console.error("Quiz submit error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getQuestionsForCard, submitQuiz };
