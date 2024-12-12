// src/components/ContactList.js
import React, { useEffect, useState } from 'react';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/contacts')  
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched contacts:', data);  // Логируем данные, полученные с сервера
        setContacts(data); // Устанавливаем полученные данные
        setLoading(false); // Завершаем процесс загрузки
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        setError('Ошибка загрузки контактов');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.contactList}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact._id} style={styles.contactCard}>
              <h3 style={styles.contactName}>{contact.name}</h3>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Message:</strong> {contact.message}</p>
            </div>
          ))
        ) : (
          <p>Нет доступных контактов.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '5px',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  contactCard: {
    background: '#444',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    color: '#fff',
  },
  contactName: {
    fontSize: '1.5rem',
    color: '#ffcc00',
  },
};

export default ContactList;
