const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  aptitude: { type: Object, default: {} },
  softSkills: { type: Object, default: {} },
  recommendation: { type: Object, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizResult", QuizResultSchema);
