
import React from 'react';
import { Link } from 'react-router-dom';

function CarCard({ car, isAuthenticated }) {
  return (
    <div style={styles.card}>
      <h3>{car.make} {car.model}</h3>
      <p>Год: {car.year}</p>
      <p>Цена: {car.price}</p>
      <p>Цвет: {car.color}</p>
      <p>Пробег: {car.mileage}</p>
      <div style={styles.actions}>
        <Link to={`/cars/${car._id}/details`}>
          <button style={styles.button}>Details</button>
        </Link>
        {isAuthenticated && (
          <Link to={`/cars/${car._id}/edit`}>
            <button style={styles.button}>Редактировать</button>
          </Link>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #555',
    padding: '15px',
    width: '250px',
    background: '#444',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px'
  },
  button: {
    padding: '5px 10px',
    background: '#ffcc00',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#000',
    fontWeight: 'bold'
  }
};

export default CarCard;
