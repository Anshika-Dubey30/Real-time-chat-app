const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({ error: 'Server error while retrieving chat history' });
    }
});

module.exports = router;