const mongoose = require('mongoose');
const { Schema } = mongoose;

const carSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Категория обязательна']
  },
  make: {
    type: String,
    required: true,
    minlength: [2, 'Марка должна содержать минимум 2 символа'],
  },
  model: {
    type: String,
    required: true,
    minlength: [2, 'Модель должна содержать минимум 2 символа'],
  },
  year: {
    type: Number,
    required: true,
    min: [1900, 'Год выпуска должен быть после 1900 года'],
    max: [new Date().getFullYear(), 'Год выпуска не может быть больше текущего'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Цена не может быть отрицательной'],
  },
  mileage: {
    type: Number,
    min: [0, 'Пробег не может быть отрицательным'],
  },
  color: {
    type: String,
    required: true,
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.models.Car || mongoose.model('Car', carSchema);
