const express = require('express');
const { createReview, getReviewsByCar, getReview, updateReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

// Создание ревью для конкретной машины
router.post('/', createReview);

// Получение всех ревью для конкретной машины
router.get('/car/:carId', getReviewsByCar);

// Получение конкретного ревью
router.get('/:id', getReview);

// Обновление ревью
router.put('/:id', updateReview);

// Удаление ревью
router.delete('/:id', deleteReview);

module.exports = router;
