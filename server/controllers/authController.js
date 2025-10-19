const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const { suggestCareer } = require("./aiController");

dotenv.config();

const JWT_EXPIRES = "7d";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
};


const signup = async (req, res) => {
  try {
    const { name, email, password, role, experience, domain } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // Step 1: Create user (without recommendation)
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      experience,
      domain,
    });

    // Step 2: Call AI logic to generate recommendation (pass mock quiz data if needed)
    // We'll simulate a call similar to req/res but use direct function call
    let recommendation = null;
    try {
      // simulate express req.user inside suggestCareer
      const mockReq = { user, body: { aptitude: {}, softSkills: {} } };
      const mockRes = {
        status: () => mockRes,
        json: (data) => data,
      };

      // use suggestCareer logic — returns { recommendation }
      const result = await suggestCareer(mockReq, mockRes, true);
      if (result?.recommendation) recommendation = result.recommendation;
    } catch (err) {
      console.warn("AI suggestion generation failed:", err.message);
      recommendation = {
        top3: [
          {
            title: domain ? `${domain} Specialist` : "Generalist Role",
            why: "Based on your role and experience.",
            keySkills: ["Problem Solving", "Communication"],
            roadmap: [
              "Learn fundamentals of your chosen field",
              "Work on small real-world projects",
              "Take domain-specific courses",
            ],
            sampleCourses: [
              "Introduction to Professional Skills",
              `Basics of ${domain || "Career Development"}`,
            ],
          },
        ],
        recommendedAssessment:
          "Retake the quiz after you finish the first roadmap step.",
      };
    }

    // Step 3: Save recommendation once (cannot be modified until career completion)
    user.recommendation = recommendation;
    await user.save();

    // Step 4: Generate JWT and respond
    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          experience: user.experience,
          domain: user.domain,
          recommendation: user.recommendation,
        },
      });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    const loggedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      experience: user.experience,
      domain: user.domain,
      recommendation: user.recommendation,
      quizResults: user.quizResults || [],
    };
    res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    })
    .status(200)
    .json({ user: loggedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};


const getDashboard = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Progress based on number of quiz results (optional)
    const progress = user.quizResults?.length ? 100 : 0;

    // Recommendation is stored directly in user.recommendation
    const latestRecommendation = user.recommendation || null;

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        experience: user.experience,
        domain: user.domain,
        recommendation: latestRecommendation, // send recommendation to frontend
        quizResults: user.quizResults || [],
      },
      progress,
      quizHistory: user.quizResults || [], // keep quiz history if needed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Export all functions in CommonJS style
module.exports = { signup, login, logout, getDashboard };
