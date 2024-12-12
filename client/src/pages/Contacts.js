// src/pages/Contacts.js
import React from 'react';
import ContactList from '../components/ContactList';  // Импортируем компонент для отображения контактов

function Contacts() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Контакты</h1>
      <p style={styles.subtitle}>Просмотрите доступные контакты ниже:</p>
      <ContactList />
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '20px',
    borderRadius: '5px',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#ffcc00',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: '#aaa',
  },
};

export default Contacts;
