const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { generateComplaint } = require("../controller/legalController");

router.post("/complaint", authMiddleware, generateComplaint);

module.exports = router;