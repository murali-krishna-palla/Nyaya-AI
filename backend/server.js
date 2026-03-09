const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nyaya-ai-roan.vercel.app",
    "https://nyaya-ai-git-main-muralis-projects-53a36327.vercel.app",
    "https://nyaya-5drgedzrw-muralis-projects-53a36327.vercel.app",
    "https://nyaya-ai-sief.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    keyLength: process.env.GEMINI_API_KEY?.length || 0
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/document", require("./routes/documentRoutes"));
app.use("/api/legal", require("./routes/legalRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});