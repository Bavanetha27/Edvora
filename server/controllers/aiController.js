const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

/**
 * This controller:
 * - Takes the logged-in user's profile.
 * - Calls Gemini (or fallback AI) to generate a personalized career recommendation.
 * - Saves the recommendation once per user (does not overwrite if it already exists).
 */

const suggestCareer = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent overwriting existing recommendation
    if (user.recommendation) {
      return res.status(400).json({ message: "Recommendation already exists for this user." });
    }

    // Build LLM prompt
    const prompt = `
You are a professional career guidance assistant. Return *only* valid JSON, no explanations.

User Details:
  name: ${user.name}
  role: ${user.role}
  experience: ${user.experience}
  domain: ${user.domain}

Your Task:
Based on the user's profile, generate a personalized career recommendation.

Include:
- top5: array of objects with the following structure:
  {
    "title": "Career Title",
    "why": "Reason this path fits the user",
    "keySkills": ["Skill1", "Skill2", "Skill3"],
    "roadmap": [
      "Step 1: Learn foundations",
      "Step 2: Work on small projects",
      "Step 3: Build a portfolio"
    ],
    "courses": [
      {
        "name": "Course Title",
        "platform": "Coursera | Udemy | edX | LinkedIn Learning",
        "link": "https://valid-course-url.com"
      }
    ]
  }

- recommendedAssessment: "Short sentence suggesting what to do next (e.g., Retake quiz after completing one roadmap stage)."

Return **only JSON**, no text before or after.
Ensure all course links are realistic and from real online learning platforms (Coursera, Udemy, edX, or LinkedIn Learning).
`;

    let aiResponseText = null;

    try {
      // Using Google Generative AI (Gemini)
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const client = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
      );

      const model = client.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-1.5-pro",
      });

      const result = await model.generateContent(prompt);
      aiResponseText = result.response.text();
    } catch (err) {
      console.warn(
        "Gemini module call failed or not installed. Falling back to placeholder.",
        err
      );
    }

    // Parse AI response or fallback
    let recommendation = null;
    if (aiResponseText) {
      try {
        recommendation = JSON.parse(aiResponseText);
      } catch {
        recommendation = { text: aiResponseText };
      }
    } else {
      // fallback recommendation if AI fails
      recommendation = {
        top5: [
          {
            title: user.domain ? `${user.domain} Specialist` : "General Career Path",
            why: "Your profile and skills match this professional path.",
            keySkills: ["Problem Solving", "Adaptability", "Communication"],
            roadmap: ["Step 1: Strengthen fundamentals", "Step 2: Take online projects"],
            courses: [
              {
                name: "Career Development Foundations",
                platform: "LinkedIn Learning",
                link: "https://www.linkedin.com/learning/",
              },
            ],
          },
        ],
        recommendedAssessment: "Re-evaluate career goals after completing your first course.",
      };
    }

    // Save recommendation (only once)
    user.recommendation = recommendation;
    await user.save();

    res.json({ recommendation });
  } catch (err) {
    console.error("AI suggestion error:", err);
    res.status(500).json({ message: "AI suggestion failed" });
  }
};

module.exports = { suggestCareer };
