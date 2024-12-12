
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';

function ReviewPage() {
  const { carId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
   
    fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));

   
    fetch(`http://localhost:5000/api/reviews/car/${carId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => {
        console.error('Ошибка при загрузке ревью:', err);
        setError('Не удалось загрузить ревью');
      });
  }, [carId]);

  const handleAddReview = (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (rating < 1 || rating > 5) {
      setError('Рейтинг должен быть от 1 до 5');
      return;
    }
    if (!comment.trim()) {
      setError('Комментарий обязателен');
      return;
    }

    fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify({ car: carId, rating, comment })
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        setReviews([...reviews, data]);
        setRating(5);
        setComment('');
      } else {
        setError(data.message || 'Ошибка при добавлении ревью');
      }
    })
    .catch(err => setError('Ошибка сервера: ' + err.message));
  };

  const handleEditReview = (review) => {
    const newRating = prompt('Введите новый рейтинг (1-5):', review.rating);
    const newComment = prompt('Введите новый комментарий:', review.comment);

    if (newRating === null || newComment === null) return;

    if (newRating < 1 || newRating > 5) {
      alert('Рейтинг должен быть от 1 до 5');
      return;
    }
    if (!newComment.trim()) {
      alert('Комментарий обязателен');
      return;
    }

    fetch(`http://localhost:5000/api/reviews/${review._id}`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify({ rating: newRating, comment: newComment })
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        setReviews(reviews.map(r => r._id === data._id ? data : r));
      } else {
        alert(data.message || 'Ошибка при обновлении ревью');
      }
    })
    .catch(err => alert('Ошибка сервера: ' + err.message));
  };

  const handleDeleteReview = (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить это ревью?')) return;

    fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Review deleted') {
        setReviews(reviews.filter(r => r._id !== id));
      } else {
        alert(data.message || 'Ошибка при удалении ревью');
      }
    })
    .catch(err => alert('Ошибка сервера: ' + err.message));
  };

  return (
    <div style={styles.container}>
      <h2>Ревью</h2>
      {error && <p style={styles.error}>{error}</p>}
      {user ? (
        <form onSubmit={handleAddReview} style={styles.form}>
          <label style={styles.label}>Рейтинг:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={styles.select}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <label style={styles.label}>Комментарий:</label>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Добавить Ревью</button>
        </form>
      ) : (
        <p>Пожалуйста, <a href="/auth">войдите</a>, чтобы оставить ревью.</p>
      )}
      <div style={styles.reviewsList}>
        {reviews.map(review => (
          <ReviewCard 
            key={review._id} 
            review={review} 
            isOwner={user && user.email === review.user.email}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    color: '#fff',
    background: '#1a1a1a',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  },
  label: {
    marginBottom: '5px'
  },
  select: {
    padding: '10px',
    background: '#333',
    border: '1px solid #555',
    borderRadius: '3px',
    color: '#fff',
    marginBottom: '10px'
  },
  textarea: {
    padding: '10px',
    background: '#333',
    border: '1px solid #555',
    borderRadius: '3px',
    color: '#fff',
    resize: 'vertical',
    height: '100px',
    marginBottom: '10px'
  },
  button: {
    padding: '10px',
    background: '#ffcc00',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#000',
    fontWeight: 'bold'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  error: {
    color: 'red'
  }
};

export default ReviewPage;
