const Chat = require("../models/Chat");
const User = require("../models/User");
const { generateResponse, generateImageResponse } = require("../services/aiService");
const fs = require("fs");

const sendMessage = async (req, res) => {
  try {

    const { message } = req.body;

    const user = await User.findById(req.userId);
    const language = user.preferredLanguage;

    // get last 5 chats
    const previousChats = await Chat.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    let history = "";

    previousChats.reverse().forEach(chat => {
      history += `
User: ${chat.message}
Assistant: ${chat.response}
`;
    });

    const prompt = `
You are an AI legal assistant helping common people understand legal issues.

Respond in ${language}.

Conversation History:
${history}

User Question:
${message}
`;

    const aiResponse = await generateResponse(prompt);

    const chat = await Chat.create({
      userId: req.userId,
      message,
      response: aiResponse,
      language
    });

    res.json({
      message,
      response: aiResponse
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const sendMessageWithFile = async (req, res) => {
  try {
    const { message } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.userId);
    const language = user.preferredLanguage;

    const previousChats = await Chat.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    let history = "";
    previousChats.reverse().forEach(chat => {
      history += `\nUser: ${chat.message}\nAssistant: ${chat.response}\n`;
    });

    let aiResponse;
    const mimeType = file.mimetype;
    const filePath = file.path;
    const userMessage = message || "Analyze this file";

    if (mimeType.startsWith("image/")) {
      const imageBuffer = fs.readFileSync(filePath);
      aiResponse = await generateImageResponse(imageBuffer, mimeType, language);
    } else {
      let fileText = "";

      if (mimeType === "application/pdf") {
        const pdfParse = require("pdf-parse");
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        fileText = pdfData.text;
      } else {
        fileText = fs.readFileSync(filePath, "utf8");
      }

      const prompt = `
You are an AI legal assistant helping common people understand legal issues.

Respond in ${language}.

Conversation History:
${history}

The user uploaded a file with the following content:
${fileText}

User Message:
${userMessage}
`;
      aiResponse = await generateResponse(prompt);
    }

    // Clean up uploaded file
    fs.unlink(filePath, () => {});

    await Chat.create({
      userId: req.userId,
      message: userMessage,
      response: aiResponse,
      language,
      fileName: file.originalname,
      fileType: mimeType,
    });

    res.json({
      message: userMessage,
      response: aiResponse,
      fileName: file.originalname,
      fileType: mimeType,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendMessage, getChatHistory, sendMessageWithFile };