const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require('nodemailer');

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

          GUIDELINES:
          1. Provide complete, helpful responses. Do not cut off sentences.
          2. All responses should be professional, polite, and helpful. Avoid saying you are just an AI that cannot perform physical services.
          3. Ask for the prospect's name and location in Delta State, and their phone number.
          4. DO NOT send the signal "PROSPECT_READY" until you have at least their name AND phone number AND location AND clear service intent.
          5. If the user asks for a quote, provide a general estimate based on typical costs in Delta State, Nigeria, but do not provide exact pricing without further details.
          6. If the user asks for a site visit or installation, politely inform them that a physical inspection is required and that a technician will contact them after they provide their details.
          7. Once you have their name, phone number, location, and service intent, end your response with exactly: "PROSPECT_READY"
          NEVER say you are just an AI that cannot perform physical services. Always be professional, polite, and helpful.
          8. All your response must be complete and all in 100 words or less. Do not introduce the company the user already knows. Do not exceed 100 words in your response.`,
          
          },
        ],
      },
    });

    const chat = model.startChat({
      history: sanitizedHistory,
      generationConfig: {
        maxOutputTokens: 500, // Increased to ensure longer, complete responses
        temperature: 0.7,
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

// Setup for lead capture email
router.post("/capture-lead", async (req, res) => {
    const { conversation } = req.body;

    // Simple email transport setup (using environment variables for security)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const conversationText = conversation.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n\n');

    try {
        // Asynchronously send the email to avoid blocking the frontend
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || 'glightise@gmail.com',
            subject: 'New Sales Lead from AI Chatbot',
            text: `A new prospect has been qualified by the AI.\n\nConversation Details:\n${conversationText}`
        }).catch(err => console.error("Background email send failed:", err));
        res.json({ success: true });
    } catch (error) {
        console.error("Email setup failed:", error);
        res.status(500).json({ error: "Failed to send lead email" });
    }
});

module.exports = router;

