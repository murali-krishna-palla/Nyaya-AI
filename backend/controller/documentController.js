const { PDFParse } = require("pdf-parse");
const { generateResponse, generateImageResponse } = require("../services/aiService");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const User = require("../models/User");
    const user = await User.findById(req.userId);
    const language = user?.preferredLanguage || "english";


    // Accept PDF, TXT, PNG, JPG
    const mime = req.file.mimetype;
    if (mime === "application/pdf") {
      const parser = new PDFParse({ data: req.file.buffer });
      const result = await parser.getText();
      const fileText = result.text;
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
      return res.json({ simplifiedExplanation: aiResponse });
    }
    if (mime === "text/plain") {
      const fileText = req.file.buffer.toString("utf8");
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
      return res.json({ simplifiedExplanation: aiResponse });
    }
    // Accept PNG, JPG, JPEG
    if (["image/png", "image/jpeg", "image/jpg"].includes(mime)) {
      const aiResponse = await generateImageResponse(req.file.buffer, mime, language);
      return res.json({ simplifiedExplanation: aiResponse });
    }
    return res.status(400).json({ message: "Unsupported file type" });

  } catch (error) {
    console.error("Document upload error:", error);
    res.status(500).json({ message: "Error processing document", error: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

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
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Error processing image", error: error.message });
  }
};

module.exports = { uploadDocument, uploadImage };