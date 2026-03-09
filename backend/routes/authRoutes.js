const express = require("express");
const router = express.Router();

const { registerUser, loginUser, updateLanguage } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/language", authMiddleware, updateLanguage);

module.exports = router;