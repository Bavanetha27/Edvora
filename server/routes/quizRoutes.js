const express = require("express");
const { getQuestionsForCard, submitQuiz } = require("../controllers/quizController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get('/questions', protect, getQuestionsForCard);
router.post("/submit", protect, submitQuiz);

module.exports = router;
