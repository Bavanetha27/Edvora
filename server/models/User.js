const mongoose = require("mongoose");

// Sub-schema for each quiz section
const SectionScoreSchema = new mongoose.Schema({
  score: { type: Number },
  date: { type: Date, default: Date.now },
}, { _id: false });

// Quiz result schema
const QuizResultSchema = new mongoose.Schema({
  aptitude: { type: SectionScoreSchema, default: null },
  softSkills: { type: SectionScoreSchema, default: null },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

// User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Professional"], default: "Student" },
  experience: { type: Number, default: 0 },
  domain: { type: String, default: "" },
  quizResults: [QuizResultSchema],
  recommendation: { type: Object, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
