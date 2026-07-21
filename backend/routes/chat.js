const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Safely initialize using environment variables
const apiKey = process.env.GEMINI_API_KEY;
console.log(
  "Loaded API Key Check:",
  apiKey ? apiKey.substring(0, 6) + "..." : "UNDEFINED!",
);

const genAI = new GoogleGenerativeAI(apiKey);

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;

    // Clean and validate history to ensure it starts with a 'user' role
    let sanitizedHistory = history || [];
    while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== "user") {
      sanitizedHistory.shift();
    }

    // Using the correct free-tier model string identifier
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
      systemInstruction: {
        parts: [
          {
            text: `You are the official AI Sales and Technical Assistant for Godslight Solars & Technical Services (GITSE), located and operating in Delta State, Nigeria. 
          Your job is to assist clients with inquiries regarding Solar Power systems, Inverters, CCTV Security, Starlink installations, and Smart Home/Industrial Automation services. 
          NEVER say you are just an AI that cannot perform physical services. GITSE provides these professional engineering and installation services directly. 
          Always be professional, polite, and helpful. Guide customers through sizing appliances, selecting solar/automation equipment, and smoothly direct them to continue on WhatsApp (number 2347064110671) for final quotes and site inspections.`,
          },
        ],
      },
    });

    const chat = model.startChat({
      history: sanitizedHistory,
      generationConfig: {
        maxOutputTokens: 150, // Keeps replies snappy and fast
        temperature: 0.7, // Focused and relevant output
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const replyText = response.text();

    console.log("Gemini API Response:", replyText);
    res.json({ reply: replyText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to connect to AI assistant" });
  }
});

module.exports = router;
