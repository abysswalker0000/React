// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AuthChoicePage from './pages/AuthChoicePage';
import AuthPasswordPage from './pages/AuthPasswordPage';
import RegisterPage from './pages/RegisterPage';
import CatalogPage from './pages/CatalogPage';
import AddPage from './pages/AddPage';
import EditCarPage from './pages/EditCarPage';
import ReviewPage from './pages/ReviewPage';
import CarDetailsPage from './pages/CarDetailsPage';
import Contacts from './pages/Contacts';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthChoicePage />} />
          <Route path="/auth/password" element={<AuthPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cars/add" element={<AddPage />} />
          <Route path="/cars/:id/edit" element={<EditCarPage />} />
          <Route path="/cars/:carId/reviews" element={<ReviewPage />} />
          <Route path="/cars/:id/details" element={<CarDetailsPage />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    padding: '20px'
  }
};

export default App;
