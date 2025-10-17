const express = require("express");
const { signup, login,logout, getDashboard } =  require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", protect, getDashboard);
router.post("/logout", logout);

module.exports = router;
