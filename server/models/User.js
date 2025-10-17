const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  aptitude: { type: Object, default: {} },
  softSkills: { type: Object, default: {} },
  recommendation: { type: Object, default: null },
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Professional"], default: "Student" },
  experience: { type: Number, default: 0 }, // years
  domain: { type: String, default: "" },
  quizResults: [QuizResultSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
