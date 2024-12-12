
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';

function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Получение текущего пользователя
    fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));

    // Получение информации о машине
    fetch(`http://localhost:5000/api/cars/${id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setCar(data))
      .catch(err => {
        console.error('Ошибка при загрузке машины:', err);
        setError('Не удалось загрузить информацию о машине');
      });

    // Получение ревью
    fetch(`http://localhost:5000/api/reviews/car/${id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => {
        console.error('Ошибка при загрузке ревью:', err);
        setError('Не удалось загрузить ревью');
      });
  }, [id]);

  if (!car) return <p style={{ color: '#fff' }}>Загрузка...</p>;

  return (
    <div style={styles.container}>
      <h2>{car.make} {car.model}</h2>
      <p><strong>Год:</strong> {car.year}</p>
      <p><strong>Цена:</strong> {car.price}</p>
      <p><strong>Цвет:</strong> {car.color}</p>
      <p><strong>Категория:</strong> {car.category.name}</p>
      <Link to={`/cars/${id}/reviews`}>
        <button style={styles.button}>Посмотреть Ревью</button>
      </Link>
      {isAuthenticated(user) && (
        <Link to={`/cars/${id}/reviews`}>
          <button style={styles.button}>Добавить Ревью</button>
        </Link>
      )}
      <h3>Ревью</h3>
      {error && <p style={styles.error}>{error}</p>}
      {reviews.length > 0 ? (
        reviews.map(review => (
          <ReviewCard 
            key={review._id} 
            review={review} 
            isOwner={user && user.email === review.user.email}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))
      ) : (
        <p>Нет ревью для этой машины.</p>
      )}
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
  button: {
    padding: '10px',
    background: '#ffcc00',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#000',
    fontWeight: 'bold',
    marginTop: '10px',
    marginRight: '10px'
  },
  error: {
    color: 'red'
  }
};

const isAuthenticated = (user) => {
  return user !== null;
};

export default CarDetailsPage;
