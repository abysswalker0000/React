import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';

function CatalogPage() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('price');
  const [order, setOrder] = useState('asc');
  const [error, setError] = useState('');

  // Загрузка данных о пользователе и автомобилях
  useEffect(() => {
    // Проверка аутентификации
    fetch('http://localhost:5000/api/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error('Ошибка при получении данных пользователя:', err));

    // Формирование URL для запроса с параметрами
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sortField) params.append('sort', sortField);
    params.append('order', order);  // всегда добавляем параметр порядка сортировки

    fetch(`http://localhost:5000/api/cars?${params.toString()}`)
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => {
        console.error('Ошибка при загрузке автомобилей:', err);
        setError('Ошибка при загрузке автомобилей');
      });
  }, [search, sortField, order]); // зависимости для перезапуска запроса

  // Обработчики для поиска и сортировки
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleOrderChange = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div style={styles.container}>
      <h2>Каталог автомобилей</h2>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Поиск по марке или модели"
          value={search}
          onChange={handleSearchChange}
          style={styles.input}
        />
        <select value={sortField} onChange={handleSortFieldChange} style={styles.select}>
          <option value="price">Цена</option>
          <option value="year">Год</option>
          <option value="mileage">Пробег</option>
        </select>
        <button onClick={handleOrderChange} style={styles.button}>
          Порядок: {order === 'asc' ? 'Возрастание' : 'Убывание'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {user && (
        <Link to="/cars/add">
          <button style={styles.addButton}>Добавить автомобиль</button>
        </Link>
      )}

      <div style={styles.carsList}>
        {cars.length === 0 ? (
          <p>Нет доступных автомобилей для отображения.</p>
        ) : (
          cars.map(car => (
            <CarCard key={car._id} car={car} isAuthenticated={!!user} />
          ))
        )}
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
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    background: '#333',
    border: '1px solid #555',
    borderRadius: '3px',
    color: '#fff',
  },
  select: {
    padding: '8px',
    background: '#333',
    border: '1px solid #555',
    borderRadius: '3px',
    color: '#fff',
  },
  button: {
    padding: '8px 12px',
    background: '#555',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#ffcc00',
  },
  addButton: {
    padding: '10px 15px',
    background: '#ffcc00',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#000',
    marginBottom: '20px',
  },
  carsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  error: {
    color: 'red',
  },
};

export default CatalogPage;
