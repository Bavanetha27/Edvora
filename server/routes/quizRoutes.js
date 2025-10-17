const express = require("express");
const { submitQuiz } = require("../controllers/quizController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/submit", protect, submitQuiz);

module.exports = router;
