const { generateResponse } = require("../services/aiService");

const generateComplaint = async (req, res) => {
  try {

    const { issue } = req.body;

    const prompt = `
You are a legal assistant.

Write a formal police complaint based on the following issue.

The complaint should include:
- Address to police station
- Subject
- Clear description
- Request for action

Issue:
${issue}
`;

    const aiResponse = await generateResponse(prompt);

    res.json({
      complaintDraft: aiResponse
    });

  } catch (error) {
    res.status(500).json({ message: "Error generating complaint" });
  }
};

module.exports = { generateComplaint };