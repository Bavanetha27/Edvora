const User = require("../models/User");

/**
 * Expected body:
 * { aptitude: { logic: 8, math: 7, ... }, softSkills: { communication: 7, empathy: 8 } }
 */
const submitQuiz = async (req, res) => {
  try {
    const { aptitude, softSkills } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newResult = {
      aptitude: aptitude || {},
      softSkills: softSkills || {},
      recommendation: null,
    };

    user.quizResults.push(newResult);
    await user.save();

    // return the newly added quiz (last element)
    const savedResult = user.quizResults[user.quizResults.length - 1];
    res.status(201).json({ quizResult: savedResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Export in CommonJS style
module.exports = { submitQuiz };
