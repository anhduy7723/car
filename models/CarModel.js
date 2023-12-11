// models/CarModel.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    price: Number,
    year: Number,
    color: String,
    fuelType: String,
    transmission: String,
    image: String,
    description: String,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
