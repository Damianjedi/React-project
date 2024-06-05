import "./Signup.css";
import {useState, useEffect} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Login() {
    const [login, setLogin] = useState('')
    const [password , setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate()

    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });
    
            if (response.ok) {
                console.log("Logowanie udane");
                localStorage.setItem('isLoggedIn', true);

                // Pobieranie danych z odpowiedzi
                const data = await response.json();

                localStorage.setItem('token', data.token);

                // Sprawdzanie czy użytkownik jest administratorem
                if (data.isAdmin) {
                    localStorage.setItem('isAdmin', true);
                    console.log("Zalogowano jako admin");
                }
                
                navigate('/home');
            } else {
                console.error("Błąd podczas logowania:", response.statusText);
            }
        } catch (err) {
            console.error("Błąd podczas logowania:", err);
        }
    };

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        const adminStatus = localStorage.getItem("isAdmin");
        if (loggedIn) {
          setIsLoggedIn(true);
        }
        if (adminStatus) {
          setIsAdmin(true);
        }
      }, []);

    return (
        
        <div>
        <nav className="navbar">
        <div className="left-items">
          <a href="home">Home</a>
          <a href="menu">Menu</a>
          <a href="opinie">Oceny</a>
          {isLoggedIn && isAdmin && <a href="orders">Zamówienia</a>}
          {isLoggedIn && <a href="yourorderstatus">Twoje zamówienia</a>}
        </div>
        <div className="right-items">
          {isLoggedIn ? (
            <a href="home" >
              Wyloguj
            </a>
          ) : (
            <>
              <a href="login">Logowanie</a>
              <a href="register">Rejestracja</a>
            </>
          )}
        </div>
      </nav>

    <div className="signup-container">
    <h1>Logowanie</h1>
    <form onSubmit={handleLogin} id="login">
        <label htmlFor="login">Login:</label>
        <input type="text" id="username2" name="login" required onChange={(e) => setLogin(e.target.value)}/>
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password2" name="password" required onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="loginbtn">Zaloguj</button>
    </form>
    </div>

    <footer className="footer">
        <p className="copyright">
            KEBABEE Copyright 
            <span className="year">© 2024</span> - 
            All rights reserved
        </p>
    </footer>

    </div>

    


    )
}

export default Login;