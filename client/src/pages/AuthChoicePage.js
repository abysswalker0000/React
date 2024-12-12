
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthChoicePage() {
  const navigate = useNavigate();

  const handlePasswordLogin = () => {
    navigate('/auth/password');
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div style={styles.container}>
      <h2>Выберите способ входа</h2>
      <button onClick={handlePasswordLogin} style={styles.button}>Вход по паролю</button>
      <button onClick={handleGoogleLogin} style={{ ...styles.button, marginTop: '10px' }}>Вход через Google</button>
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
    margin: '0 auto',
    textAlign: 'center'
  },
  button: {
    padding: '10px',
    background: '#ffcc00',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#000',
    fontWeight: 'bold',
    width: '100%'
  }
};

export default AuthChoicePage;
