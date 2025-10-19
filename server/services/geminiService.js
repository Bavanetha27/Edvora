const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;

// Gemini REST endpoint (Google AI Studio endpoint)
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Safely parses JSON from Gemini text response.
 * Extracts the first JSON array found in the text.
 */
function safeParseJSON(text) {
  try {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("No JSON array found in Gemini response");
    }
    const jsonString = text.slice(start, end + 1);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Gemini parse error:", err.message);
    console.log("Raw Gemini response text:", text);
    throw new Error("Failed to parse Gemini API response");
  }
}

/**
 * Generate quiz questions using Gemini API.
 * @param {string} topic - The quiz topic (e.g., "soft skills", "aptitude").
 * @param {number} numQuestions - Number of questions to generate (default 10).
 * @returns {Promise<Array>} - Array of questions with options and answers.
 */
const generateQuestions = async (prompt) => {
  if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY in environment");
  if (!prompt) throw new Error("Topic is required to generate questions");

  try {
    const headers = {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    };

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 2500,
      },
    };

    const response = await axios.post(GEMINI_API_URL, body, { headers });

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    if (!text) throw new Error("Empty response from Gemini API");

    const questionsArray = safeParseJSON(text);

    // Add IDs for frontend
    return questionsArray.map((q, idx) => ({
      id: q.id || `q${idx + 1}`,
      question: q.question || "Untitled question",
      options: Array.isArray(q.options) ? q.options : [],
      // Extract the correct answer using answerIndex
      answerIndex: typeof q.answerIndex === "number" ? q.answerIndex : null,
      answer: typeof q.answerIndex === "number" && Array.isArray(q.options)
        ? q.options[q.answerIndex]
        : null
    }));
  } catch (err) {
    console.error("Gemini API Error:", err?.response?.data || err.message);
    throw new Error("Failed to generate questions from Gemini API");
  }
};

module.exports = { generateQuestions };
