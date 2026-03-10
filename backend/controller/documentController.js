const pdfParse = require("pdf-parse");
const { generateResponse, generateImageResponse } = require("../services/aiService");

const uploadDocument = async (req, res) => {
  try {
    const User = require("../models/User");
    const user = await User.findById(req.userId);
    const language = user?.preferredLanguage || "english";

    let fileText = "";

    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdfParse(req.file.buffer);
      fileText = pdfData.text;
    } else {
      fileText = req.file.buffer.toString("utf8");
    }
const prompt = `
You are an AI legal assistant helping common people understand legal documents in India.

Respond in ${language}.

Analyze the following legal document and provide:

1. Simple explanation in easy language
2. Important legal sections mentioned (IPC / CrPC etc.)
3. Seriousness of the case (Low / Medium / High)
4. Possible punishment under Indian law
5. Whether the offense may be bailable or non-bailable
6. What the person should do next
7. Rights of the person involved

Important:
Explain everything in simple terms so a non-lawyer can understand.

Document:
${fileText}

"This explanation is for informational purposes only and should not replace advice from a qualified lawyer."
`;

    const aiResponse = await generateResponse(prompt);

    res.json({
      simplifiedExplanation: aiResponse
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing document" });
  }
};

const uploadImage = async (req, res) => {
  try {
    const mimeType = req.file.mimetype;
    const imageBuffer = req.file.buffer;
    const User = require("../models/User");
    const user = await User.findById(req.userId);
    const language = user?.preferredLanguage || "english";

    const aiResponse = await generateImageResponse(imageBuffer, mimeType, language);

    res.json({
      simplifiedExplanation: aiResponse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing image" });
  }
};

module.exports = { uploadDocument, uploadImage };