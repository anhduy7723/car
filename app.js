// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const carRoutes = require('./routes/carRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: ['GET', 'POST'],
  },
});

// Set io object in the app
app.set('io', io);

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/car', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/cars', carRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/chat', chatRoutes); // Use chatRoutes

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Example: Handling a chat message event
  socket.on('message', (data) => {
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
