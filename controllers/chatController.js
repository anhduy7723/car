// chatController.js
const Message = require('../models/Message');

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = new Message({ user, message });
    await newMessage.save();

    // Get the io object from the app
    const io = req.app.get('io');

    // Broadcast the message to all connected clients
    io.emit('message', `${user}: ${message}`);

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllMessages, sendMessage };
