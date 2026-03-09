const Chat = require("../models/Chat");
const User = require("../models/User");
const { generateResponse } = require("../services/aiService");

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

module.exports = { sendMessage, getChatHistory };