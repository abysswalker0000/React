
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';

function AddPage() {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState('');
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
        }
      })
      .catch(err => console.error(err));
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!category) {
      setError('Категория обязательна');
      return;
    }
    if (make.trim().length < 2) {
      setError('Марка должна содержать минимум 2 символа');
      return;
    }
    if (model.trim().length < 2) {
      setError('Модель должна содержать минимум 2 символа');
      return;
    }
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      setError(`Год выпуска должен быть между 1900 и ${currentYear}`);
      return;
    }
    if (price < 0) {
      setError('Цена не может быть отрицательной');
      return;
    }
    if (mileage < 0) {
      setError('Пробег не может быть отрицательным');
      return;
    }
    if (!color) {
      setError('Цвет обязателен');
      return;
    }

    fetch('http://localhost:5000/api/cars', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify({ category, make, model, year, price, mileage, color })
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        navigate('/catalog');
      } else {
        setError(data.message || 'Ошибка при добавлении автомобиля');
      }
    })
    .catch(err => setError('Ошибка сервера: ' + err.message));
  };

  return (
    <div style={styles.container}>
      <h2>Добавить автомобиль</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <CategorySelect selectedCategory={category} setSelectedCategory={setCategory} />
        <input 
          type="text"
          placeholder="Марка"
          value={make}
          onChange={(e)=>setMake(e.target.value)}
          style={styles.input}
        />
        <input 
          type="text"
          placeholder="Модель"
          value={model}
          onChange={(e)=>setModel(e.target.value)}
          style={styles.input}
        />
        <input 
          type="number"
          placeholder="Год"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
          style={styles.input}
        />
        <input 
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          style={styles.input}
        />
        <input 
          type="number"
          placeholder="Пробег"
          value={mileage}
          onChange={(e)=>setMileage(e.target.value)}
          style={styles.input}
        />
        <input 
          type="text"
          placeholder="Цвет"
          value={color}
          onChange={(e)=>setColor(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Добавить</button>
      </form>
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
  error: {
    color: 'red'
  }
};

export default AddPage;
