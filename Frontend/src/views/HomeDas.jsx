import React from 'react';
import { useAuth } from '../context/AuthContext';
import './homeDas.css';

export const HomeDas = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="containerHome">
      <h1 className="welcomeMessage">Bienvenido:</h1>
      <div className="profileCard">
        <h2 className="userRole">{user.user.rol}</h2>
        <p className="userEmail">{user.user.email}</p>
      </div>
    </div>
  );
};
