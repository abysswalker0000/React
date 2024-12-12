
import React from 'react';

function ReviewCard({ review, isOwner, onEdit, onDelete }) {
  return (
    <div style={styles.card}>
      <p><strong>Пользователь:</strong> {review.user.username}</p>
      <p><strong>Рейтинг:</strong> {review.rating}</p>
      <p><strong>Комментарий:</strong> {review.comment}</p>
      <p><strong>Дата:</strong> {new Date(review.reviewDate).toLocaleString()}</p>
      {isOwner && (
        <div style={styles.actions}>
          <button onClick={() => onEdit(review)} style={styles.button}>Редактировать</button>
          <button onClick={() => onDelete(review._id)} style={{ ...styles.button, background: 'red' }}>Удалить</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: '#333',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    color: '#fff'
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
    color: '#000'
  }
};

export default ReviewCard;
