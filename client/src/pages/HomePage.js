import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  // Состояния для хранения данных, ошибок и индикатора загрузки
  const [nasaImage, setNasaImage] = useState(null);  // Для изображения NASA
  const [randomFact, setRandomFact] = useState('');   // Для факта о кошках
  const [loading, setLoading] = useState(true);  // Индикатор загрузки
  const [error, setError] = useState(null);      // Ошибки

  useEffect(() => {
    // Запрос к API NASA для получения изображения дня
    const fetchNasaImage = async () => {
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            api_key: 'C3YJfZSKIMvQ6dED7VMOKlTbydhwm0fFo2tSqYuQ',
          },
        });
        setNasaImage(response.data); // Сохраняем данные изображения
        setLoading(false);           // Завершаем загрузку
      } catch (err) {
        setError('Error fetching NASA image');
      }
    };

 
    const fetchCatFact = async () => {
      try {
        const response = await axios.get('https://meowfacts.herokuapp.com/');
        setRandomFact(response.data.data[0]); // Сохраняем факт о кошке
      } catch (err) {
        setError('Error fetching cat fact');
      }
    };

    fetchNasaImage();  // Запрос на изображение NASA
    fetchCatFact();    // Запрос на факт о кошке
  }, []);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1>Главная Страница</h1>

      {/* NASA Image of the Day Section */}
      {nasaImage && (
        <div className="nasa-image-section">
          <h2>Изображение дня от NASA</h2>
          <img src={nasaImage.url} alt={nasaImage.title} className="nasa-image" />
          <h3>{nasaImage.title}</h3>
          <p>{nasaImage.explanation}</p>
        </div>
      )}

      {/* Random Cat Fact Section */}
      <div className="cat-fact-section">
        <h2>Случайный факт о кошке</h2>
        <p>{randomFact || "Загрузка факта о кошке..."}</p>
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
    maxWidth: '1200px',
    margin: '0 auto',
  },
  'nasa-image': {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
};

export default HomePage;
