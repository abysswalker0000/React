import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TimeZoneDisplay from './TimeZoneDisplay';  // Импортируем компонент

function NavBar() {
  const [user, setUser] = useState(null);

  // Fetch user info
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));
  }, []);

  // Handle logout action
  const handleLogout = () => {
    fetch('http://localhost:5000/api/auth/logout', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(() => {
      setUser(null);
      window.location.href = '/';
    })
    .catch(err => console.error(err));
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
    background: '#000',
    color: '#ffcc00',
    padding: '15px',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const linkStyle = {
    color: '#ffcc00',
    textDecoration: 'none',
    fontSize: '16px'
  };

  const buttonStyle = {
    background: '#555',
    color: '#ffcc00',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '3px'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Главная</Link>
      <Link to="/catalog" style={linkStyle}>Каталог</Link>
      <Link to="/contacts" style={linkStyle}>Контакты</Link>
      {!user && (
        <>
          <Link to="/auth" style={linkStyle}>Войти</Link>
          <Link to="/register" style={linkStyle}>Регистрация</Link>
        </>
      )}
      {user && (
        <>
          <span style={{ color: '#ffcc00', fontSize: '16px' }}>{user.username}</span>
          
          <button onClick={handleLogout} style={buttonStyle}>Выйти</button>
          <TimeZoneDisplay />
        </>
      )}
    </nav>
  );
}

export default NavBar;
