// seed.js

const mongoose = require('mongoose');
const Car = require('./models/CarModel');
const Appointment = require('./models/AppointmentModel');

mongoose.connect('mongodb://localhost:27017/car', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Seed cars
    const carData = [
        {
            brand: 'Toyota',
            model: 'Camry',
            price: 25000,
            year: 2022,
            color: 'Silver',
            fuelType: 'Petrol',
            transmission: 'Automatic',
            image: 'https://drive.gianhangvn.com/image/dau-xe-camry-ban-cao-cap-2-5q-min-1318470j24390.jpg',
            description: 'A comfortable and reliable sedan.'
        },
        {
            brand: 'Honda',
            model: 'Civic',
            price: 22000,
            year: 2022,
            color: 'Blue',
            fuelType: 'Petrol',
            transmission: 'CVT',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-SMeglsJCBpclgKXQ6GQMAWKLkI17j9PtlrjQadrrLw&s',
            description: 'A stylish and efficient compact car.'
        },
        // Add more cars as needed
    ];

    await Car.insertMany(carData);
    console.log('Cars seeded successfully');

    // Seed appointments
    const appointmentData = [
        {
            customerName: 'John Doe',
            email: 'john@example.com',
            appointmentDate: new Date('2023-01-10T10:00:00Z'),
            storeLocation: 'Downtown Store'
        },
        {
            customerName: 'Jane Doe',
            email: 'jane@example.com',
            appointmentDate: new Date('2023-01-15T14:30:00Z'),
            storeLocation: 'Suburb Store'
        },
        // Add more appointments as needed
    ];

    await Appointment.insertMany(appointmentData);
    console.log('Appointments seeded successfully');

    // Close the connection after seeding
    mongoose.connection.close();
});
