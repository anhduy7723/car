const nodemailer = require('nodemailer');
const Appointment = require('../models/AppointmentModel');

const appointmentController = {
  bookAppointment: async (req, res) => {
    try {
      const { fullName, email, phone, preferredCar } = req.body;

      const newAppointment = new Appointment({
        fullName,
        email,
        phone,
        preferredCar,
      });

      await newAppointment.save();

      await sendThankYouEmail(email, fullName);

      res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

async function sendThankYouEmail(email, fullName) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anhduy7723@gmail.com', 
      pass: 'nqsqbsklrrvgskru',    
    },
  });

  const mailOptions = {
    from: 'anhduy7723@gmail.com', 
    to: email,
    subject: 'Thank You for Booking an Appointment',
    text: `Dear ${fullName},\n\nThank you for booking an appointment with us. We look forward to serving you.\n\nBest regards,\nYour Company Name`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = appointmentController;
