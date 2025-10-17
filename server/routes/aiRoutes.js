const express = require("express");
const { suggestCareer } = require("../controllers/aiController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/suggest-career", protect, suggestCareer);

module.exports = router;
