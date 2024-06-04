import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import "./opinie.css";

function Opinions() {
  const [opinions, setOpinions] = useState([]);
  const [newOpinionText, setNewOpinionText] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (storedToken && loggedIn) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOpinions();
    }
  }, [isLoggedIn]);

  const fetchOpinions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/opinions');
      setOpinions(response.data);
    } catch (error) {
      console.error('Błąd przy pobieraniu opinii:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewOpinionText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/opinions', { text: newOpinionText }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewOpinionText('');
      fetchOpinions();
    } catch (error) {
      console.error('Błąd przy dodawaniu opinii:', error);
    }
  };

  return (
    
  

    <div className="opinions-container">

      <h1>Opinie użytkowników</h1>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="opinions-form">
          <textarea
            value={newOpinionText}
            onChange={handleInputChange}
            placeholder="Napisz swoją opinię..."
            required
            className="opinions-textarea"
          />
          <button type="submit" className="opinions-button">Dodaj opinię</button>
        </form>
      ) : (
        <div>
          <p>Proszę się zalogować, aby dodać opinię</p>
          <Link to='/login'>
            <button type="submit" className="opinions-button">Zaloguj się</button>
          </Link>
          <p>Nie masz konta? Zarejestruj się</p>
          <Link to='/register'>
            <button type="submit" className="opinions-button">Rejestracja</button>
          </Link>
        </div>
      )}
      <ul className="opinions-list">
        {opinions.map(opinion => (
          <li key={opinion._id} className="opinions-item">
            <strong>{opinion.user.login}</strong>: {opinion.text}
          </li>
        ))}
      </ul>

      

      <footer class="footer">
<p class="copyright">
    KEBABEE Copyright 
    <span class="year">© 2024</span> - 
    All rights reserved
</p>
</footer>

    </div>
  );
}

export default Opinions;
