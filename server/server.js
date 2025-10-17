const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => res.send("Career Guidance API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
