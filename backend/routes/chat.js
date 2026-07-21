const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Safely initialize using environment variables
const apiKey = process.env.GEMINI_API_KEY;
console.log("Loaded API Key Check:", apiKey ? apiKey.substring(0, 6) + "..." : "UNDEFINED!");

const genAI = new GoogleGenerativeAI(apiKey);

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Clean and validate history to ensure it starts with a 'user' role
    let sanitizedHistory = history || [];
    while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== 'user') {
      sanitizedHistory.shift(); 
    }

    // Using the correct free-tier model string identifier
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

    const chat = model.startChat({
      history: sanitizedHistory,
      generationConfig: {
        maxOutputTokens: 150, // Keeps replies snappy and fast
        temperature: 0.7,     // Focused and relevant output
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const replyText = response.text();
    
    console.log('Gemini API Response:', replyText);
    res.json({ reply: replyText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to connect to AI assistant' });
  }
});

module.exports = router;