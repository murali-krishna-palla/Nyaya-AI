const { GoogleGenAI } = require("@google/genai");

let ai = null;
const getAI = () => {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
};

// Function to clean markdown symbols
const cleanText = (text) => {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#/g, "")
    .replace(/`/g, "")
    .replace(/_/g, "")
    .trim();
};

const systemInstruction = `
You are an AI legal assistant specialized in Indian law helping common people.

Rules:
- Explain legal matters in very simple language.
- Reference Indian laws when relevant (IPC, CrPC, IT Act, Consumer Protection Act, Labour Laws).
- Provide practical next steps for the user.
- If analyzing FIR, explain seriousness, punishment, and bail possibility.
- Avoid complicated legal jargon.
- Do NOT use markdown formatting like **bold**, *, #, or headings.
- Return only plain text.

Always include this disclaimer at the end:

This information is for educational purposes only and is not a substitute for advice from a qualified lawyer.
`;

const generateResponse = async (prompt) => {
  try {
    const result = await getAI().models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${systemInstruction}\n\n${prompt}`
    });

    let responseText = result.text;
    responseText = cleanText(responseText);
    return responseText;

  } catch (error) {
    console.error("Gemini API Error:", error?.message || error);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return "AI service error: " + (error?.message || "Unknown error. Please try again later.");
  }
};

const generateImageResponse = async (imageBuffer, mimeType, language = "english") => {
  try {
    const base64Image = imageBuffer.toString("base64");

    const prompt = `${systemInstruction}

Respond in ${language}.

Analyze the following legal document image and provide:

1. Simple explanation in easy language
2. Important legal sections mentioned (IPC / CrPC etc.)
3. Seriousness of the case (Low / Medium / High)
4. Possible punishment under Indian law
5. Whether the offense may be bailable or non-bailable
6. What the person should do next
7. Rights of the person involved

Explain everything in simple terms so a non-lawyer can understand.

"This explanation is for informational purposes only and should not replace advice from a qualified lawyer."`;

    const result = await getAI().models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: base64Image } }
          ]
        }
      ]
    });

    let responseText = result.text;
    responseText = cleanText(responseText);
    return responseText;

  } catch (error) {
    console.error("Gemini Vision API Error:", error?.message || error);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return "AI service error: " + (error?.message || "Unknown error. Please try again later.");
  }
};

module.exports = { generateResponse, generateImageResponse };