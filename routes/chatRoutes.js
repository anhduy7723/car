// chatRoutes.js

const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

// Route to get all messages
router.get('/messages', chatController.getAllMessages);

// Route to send a new message
router.post('/send', (req, res) => {
  const io = req.app.get('io'); 
  chatController.sendMessage(req, res, io);
});

module.exports = router;
