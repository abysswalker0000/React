
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Клиентская валидация
    if (!email.includes('@')) {
      setErrorMsg('Некорректный email');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Пароль слишком короткий');
      return;
    }

    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include', 
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Вход выполнен успешно!');
        navigate('/catalog'); 
      } else {
        setErrorMsg(data.message || 'Ошибка при входе');
      }
    })
    .catch(err => setErrorMsg('Ошибка сервера: ' + err.message));
  };

  return (
    <div style={styles.container}>
      <h2>Вход по паролю</h2>
      {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={styles.input}
        />
        <input 
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Войти</button>
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
    maxWidth: '400px',
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

export default AuthPasswordPage;
