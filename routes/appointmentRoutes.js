// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

router.post('/book', appointmentController.bookAppointment);

module.exports = router;
