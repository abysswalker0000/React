// controllers/carController.js
const Car = require('../models/Car');
const Category = require('../models/Category');

exports.createCar = async (req, res) => {
  try {
    const { category, make, model, year, price, mileage, color } = req.body;


    // Проверим, что категория существует
    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const car = new Car({ category, make, model, year, price, mileage, color });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    let query = {};

    // Поиск по make или model
    if (req.query.search) {
      const search = req.query.search;
      query = {
        $or: [
          { make: new RegExp(search, 'i') },
          { model: new RegExp(search, 'i') }
        ]
      };
    }

    let carsQuery = Car.find(query).populate('category');

    // Сортировка
    if (req.query.sort) {
      const order = req.query.order === 'desc' ? -1 : 1;
      const sortField = req.query.sort;
      carsQuery = carsQuery.sort({ [sortField]: order });
    }

    const cars = await carsQuery.exec();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('category');
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { category, make, model, year, price, mileage, color } = req.body;

    // Если обновляют категорию, проверим что она есть
    if (category) {
      const cat = await Category.findById(category);
      if (!cat) {
        return res.status(400).json({ message: 'Invalid category' });
      }
    }

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { category, make, model, year, price, mileage, color, updatedAt: new Date() },
      { new: true }
    );

    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
