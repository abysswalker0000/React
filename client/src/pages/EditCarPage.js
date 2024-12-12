
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';

function EditCarPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState('');
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          navigate('/auth');
        } else {
          setUser(data.user);
        
          fetch(`http://localhost:5000/api/cars/${id}`)
            .then(res => res.json())
            .then(data => setCar(data))
            .catch(err => setError('Ошибка при загрузке автомобиля'));
        }
      })
      .catch(err => console.error(err));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!car.category) {
      setError('Категория обязательна');
      return;
    }
    if (car.make.trim().length < 2) {
      setError('Марка должна содержать минимум 2 символа');
      return;
    }
    if (car.model.trim().length < 2) {
      setError('Модель должна содержать минимум 2 символа');
      return;
    }
    const currentYear = new Date().getFullYear();
    if (car.year < 1900 || car.year > currentYear) {
      setError(`Год выпуска должен быть между 1900 и ${currentYear}`);
      return;
    }
    if (car.price < 0) {
      setError('Цена не может быть отрицательной');
      return;
    }
    if (car.mileage < 0) {
      setError('Пробег не может быть отрицательным');
      return;
    }
    if (!car.color) {
      setError('Цвет обязателен');
      return;
    }

    fetch(`http://localhost:5000/api/cars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify(car)
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        navigate('/catalog');
      } else {
        setError(data.message || 'Ошибка при обновлении автомобиля');
      }
    })
    .catch(err => setError('Ошибка сервера: ' + err.message));
  };

  const handleDelete = () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот автомобиль?')) return;

    fetch(`http://localhost:5000/api/cars/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Car deleted') {
        navigate('/catalog');
      } else {
        setError(data.message || 'Ошибка при удалении автомобиля');
      }
    })
    .catch(err => setError('Ошибка сервера: ' + err.message));
  };

  if (!car) return <p style={{ color: '#fff' }}>Загрузка...</p>;

  return (
    <div style={styles.container}>
      <h2>Редактировать автомобиль</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
      <CategorySelect selectedCategory={category} setSelectedCategory={setCategory} />
        <input 
          type="text"
          name="make"
          placeholder="Марка"
          value={car.make}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="text"
          name="model"
          placeholder="Модель"
          value={car.model}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="number"
          name="year"
          placeholder="Год"
          value={car.year}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="number"
          name="price"
          placeholder="Цена"
          value={car.price}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="number"
          name="mileage"
          placeholder="Пробег"
          value={car.mileage}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="text"
          name="color"
          placeholder="Цвет"
          value={car.color}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Обновить</button>
      </form>
      <button onClick={handleDelete} style={styles.deleteButton}>Удалить автомобиль</button>
    </div>
  );
}

const styles = {
  container: {
    color: '#fff',
    background: '#1a1a1a',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '500px',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    background: '#333',
    border: '1px solid #555',
    borderRadius: '3px',
    color: '#fff'
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
  deleteButton: {
    padding: '10px',
    background: 'red',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#fff',
    marginTop: '10px'
  },
  error: {
    color: 'red'
  }
};

export default EditCarPage;
