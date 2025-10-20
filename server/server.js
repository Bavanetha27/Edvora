const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const aiRoutes = require("./routes/aiRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

//CORS middleware BEFORE routes
const allowedOrigins = [
  "http://localhost:5173",
  "https://edvora-sigma-two.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS for all routes, including preflight
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => res.send("Career Guidance API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
