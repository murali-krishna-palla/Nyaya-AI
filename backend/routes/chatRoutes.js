const express = require("express");
const router = express.Router();

const { sendMessage, getChatHistory } = require("../controller/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/message", authMiddleware, sendMessage);
router.get("/history", authMiddleware, getChatHistory);

module.exports = router;