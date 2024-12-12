import React, { useState, useEffect } from 'react';
import CarCard from './CarCard'; // Импортируем компонент карточки автомобиля

function Catalog() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then(res => {
        if (!res.ok) {
          throw new Error('Не удалось загрузить автомобили');
        }
        return res.json();
      })
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка загрузки автомобилей');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Загрузка автомобилей...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={styles.catalogContainer}>
      <h2>Каталог автомобилей</h2>
      <div style={styles.carList}>
        {cars.length === 0 ? (
          <p>Нет доступных автомобилей</p>
        ) : (
          cars.map(car => (
            <CarCard key={car._id} car={car} isAuthenticated={true} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  catalogContainer: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  carList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  }
};

export default Catalog;
