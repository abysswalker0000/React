
const express = require('express');
const { createCar, getCars, getCar, updateCar, deleteCar } = require('../controllers/carController');
const sessionAuth = require('../middleware/SessionAuth'); 

const router = express.Router();

router.get('/', getCars);


router.get('/:id', getCar);

router.post('/', sessionAuth, createCar);


router.put('/:id', sessionAuth, updateCar);

router.delete('/:id', sessionAuth, deleteCar);

module.exports = router;
