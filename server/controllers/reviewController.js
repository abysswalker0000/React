
const Review = require('../models/Review');

// Создание ревью
exports.createReview = async (req, res) => {
  const { car, rating, comment } = req.body;

  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const review = new Review({
      user: req.user._id,
      car,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получение всех ревью для конкретной машины
exports.getReviewsByCar = async (req, res) => {
  const { carId } = req.params;

  try {
    const reviews = await Review.find({ car: carId }).populate('user', 'username email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Получение конкретного ревью
exports.getReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id).populate('user', 'username email');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Обновление ревью
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Проверка, что ревью принадлежит текущему пользователю
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.reviewDate = new Date();

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удаление ревью
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Проверка, что ревью принадлежит текущему пользователю
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
