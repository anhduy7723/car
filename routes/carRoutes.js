// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/CarController');

router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.post('/add', carController.addCar);

module.exports = router;
