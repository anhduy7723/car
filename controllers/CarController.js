// controllers/CarController.js
const Car = require('../models/CarModel');

const getAllCars = async (req, res) => {
    try {
        let query = {};
        if (req.query.brand) {
            query.brand = req.query.brand;
        }
        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCar = async (req, res) => {
    try {
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        res.json(savedCar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCars, getCarById, addCar };
