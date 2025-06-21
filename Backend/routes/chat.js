const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is missing in .env');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ POST /api/chat/send
router.post('/send', async (req, res) => {
  const { userId, message } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'userId and message are required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const reply = result.response.text();

    // Save full interaction in one document
    const chat = new Chat({
      userId,
      user: message,
      bot: reply
    });

    await chat.save();

    res.status(200).json({ reply });
  } catch (err) {
    console.error('❌ Gemini API Error:', err.message);
    res.status(500).json({ error: 'Error generating reply' });
  }
});

// ✅ GET /api/chat/history
router.get('/history', async (req, res) => {
  try {
    const history = await Chat.find().sort({ createdAt: 1 });
    res.status(200).json(history);
  } catch (err) {
    console.error('❌ Error fetching chat history:', err.message);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router;
