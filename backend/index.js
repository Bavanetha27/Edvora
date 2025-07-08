const express = require('express');
const mongodb = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
const Register = require("./models/RegisterSchema");
const CareerPathLevel = require("./models/CareerPathLevelSchema");

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEN_API);

mongodb.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

async function generateContent(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const config = { temperature: 1, responseMimeType: "text/plain" };
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: config,
      });
  
      const response = await result.response;
      return JSON.parse(await cleanResponse(response.text()));
    } catch (error) {
      console.error("Gemini API Error:", error);
      return [];
    }
}

function cleanResponse(response) {
    return response.replace(/^```json|```$/g, "").trim();
}

//Middleware to verify token
const verifiedToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user; 
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        return res.status(403).json({ message: "Invalid token" });
    }
};

app.get('/json', verifiedToken, (req, res) => {
    console.log("JSON filled");
    console.log(req.user)
    res.json({ message: "This is a middleware check", user: req.user.username }); 
});


//Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password, specialization, role, company, experience, level } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        const newUser = new Register({
            username, email, password: hashedPassword, specialization, role, company, experience, level
        });

        await newUser.save();
         // Generate Career Path for User
    const userInput = `The user is a ${level} level ${specialization} developer with ${experience} years working experience and working at ${company}. Generate a career path to become a proficient ${specialization} who meets industry needs. The response should be structured in JSON format with fields: level, lessons, course_name, udemy, coursera, professional_course.Provide each level as array.`

    console.log("\nGenerating career path...");
    const careerPathLevels = await generateContent(userInput);
    const careerArray = careerPathLevels.career_path;

    // Store Career Path
    const savedLevels = await CareerPathLevel.insertMany(
      careerArray.map((levelData) => ({
        userId: newUser._id,
        level: levelData.level,
        lessons: levelData.lessons,
        course_name: levelData.course_name,
        udemy: levelData.udemy,
        coursera: levelData.coursera,
        professional_course: levelData.professional_course,
      }))
    );

    console.log("Career Path Levels saved!");

        res.status(201).json({ message: "Signup successful", signupStatus: true });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(400).json({ message: "Signup Unsuccessful", error: err });
    }
});

//Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Register.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", loginStatus: false });
        }

        //Correct password comparison
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password", loginStatus: false });
        }

        const payload = { userId: user._id,email: user.email, username: user.username };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.status(200).json({ 
            message: "Login successful", loginStatus: true, token});

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Error during login" });
    }
});

// API to Fetch User's Career Path
app.get("/mypath", async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
      const userId = decoded.userId;
  
      const careerPathLevels = await CareerPathLevel.find({ userId });
  
      if (careerPathLevels.length === 0) {
        return res.status(404).json({ message: "No career path found for this user" });
      }
  
      res.json({ data: careerPathLevels });
    } catch (error) {
      console.error("Error fetching career path:", error);
      res.status(500).json({ message: "Server error" });
    }
});

//Get User Profile
app.get("/profile", verifiedToken, async (req, res) => {
    try {
        const user = await Register.findOne({ email: req.user.email }).select("username email company specialization -_id");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ message: "Error fetching profile" });
    }
});

//Update Profile
app.put("/profile", verifiedToken, async (req, res) => {
    try {
        const { username, company, expertise } = req.body;
        const updatedUser = await Register.findOneAndUpdate(
            { email: req.user.email },
            { username, company, specialization: expertise },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
});

//Delete Account
app.delete("/profile", verifiedToken, async (req, res) => {
    try {
        const deletedUser = await Register.findOneAndDelete({ email: req.user.email },{ returnDocument: "before" });
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        console.log(deletedUser._id);
        const deletedCareerPath = await CareerPathLevel.deleteMany({ userId: deletedUser._id });
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Delete Account Error:", error);
        res.status(500).json({ message: "Error deleting account" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
