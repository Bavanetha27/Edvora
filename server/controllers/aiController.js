const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

/**
 * This controller receives
 * { quizResultId (optional), aptitude, softSkills }
 * It calls Gemini (or other LLM) with user's profile + scores and saves recommendation into user's quizResults.
 *
 * IMPORTANT: You must have GEMINI_API_KEY set in .env
 */
const suggestCareer = async (req, res) => {
  try {
    const { aptitude, softSkills } = req.body;
    const user = req.user; 

    // build prompt for the LLM
    const prompt = `
You are a career guidance assistant. Return JSON only.
User:
  name: ${user.name}
  role: ${user.role}
  experience: ${user.experience}
  domain: ${user.domain}
Aptitude: ${JSON.stringify(aptitude)}
SoftSkills: ${JSON.stringify(softSkills)}

Provide:
  - top3: array of { title, why, keySkills: [], roadmap: [steps], sampleCourses: [] }
  - recommendedAssessment (short)
Return the JSON only.
`;

    let aiResponseText = null;

    try {
      // In CommonJS, dynamic import must use a promise or require
      // If using GoogleGenerativeAI, require it normally (pseudo-code)
      const { GoogleGenerativeAI } = require("@google/generative-ai"); // replace with actual client
      const client = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
      );
      const model = client.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-1.5-pro",
      });
      const result = await model.generateContent(prompt);
      aiResponseText = result.response.text();
      await finalize(aiResponseText);
    } catch (err) {
      console.warn(
        "Gemini module call failed or not installed. Falling back to placeholder.",
        err
      );
      aiResponseText = null;
      await finalize(aiResponseText);
    }

    // finalize: parse + save recommendation
    async function finalize(text) {
      let recommendation = null;
      if (text) {
        try {
          recommendation = JSON.parse(text);
        } catch (err) {
          recommendation = { text };
        }
      } else {
        recommendation = {
          top3: [
            {
              title: user.domain ? `${user.domain} Analyst` : "Generalist Analyst",
              why: "Good aptitude and soft skills align with analytical roles.",
              keySkills: ["Problem solving", "Communication"],
              roadmap: ["Learn fundamentals", "Build small projects", "Take online course"],
              sampleCourses: ["Intro to Domain - Example Course"],
            },
          ],
          recommendedAssessment:
            "Retake quiz every 3 months and try hands-on projects.",
        };
      }

      // Save into user's last quiz result if present, else add a new one
      const u = await User.findById(user._id);
      if (!u) return res.status(404).json({ message: "User not found" });

      if (u.quizResults.length > 0) {
        u.quizResults[u.quizResults.length - 1].recommendation = recommendation;
      } else {
        u.quizResults.push({
          aptitude: aptitude || {},
          softSkills: softSkills || {},
          recommendation,
        });
      }
      await u.save();
      res.json({ recommendation });
    }
  } catch (err) {
    console.error("AI suggestion error:", err);
    res.status(500).json({ message: "AI suggestion failed" });
  }
};

// Export for CommonJS
module.exports = { suggestCareer };
