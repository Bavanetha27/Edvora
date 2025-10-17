const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

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
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      experience,
      domain,
    });

    const token = generateToken(user);

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      experience: user.experience,
      domain: user.domain,
    };
    res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .status(201).json({ user: safeUser });
  } catch (err) {
    console.error(err);
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

    const progress = Math.min(100, user.quizResults?.length ? 100 : 0);

    const latestRecommendation = user.quizResults?.length
      ? user.quizResults[user.quizResults.length - 1].recommendation
      : null;

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        experience: user.experience,
        domain: user.domain,
      },
      progress,
      latestRecommendation,
      quizHistory: user.quizResults || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Export all functions in CommonJS style
module.exports = { signup, login, logout, getDashboard };
