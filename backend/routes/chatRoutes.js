const express = require("express");
const router = express.Router();

const { sendMessage, getChatHistory, sendMessageWithFile } = require("../controller/chatController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/message", authMiddleware, sendMessage);
router.post("/message-with-file", authMiddleware, upload.single("file"), sendMessageWithFile);
router.get("/history", authMiddleware, getChatHistory);

module.exports = router;