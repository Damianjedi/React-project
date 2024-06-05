import "./Signup.css";
import {useState} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Signup() {
    const [login, setLogin] = useState('')
    const [password , setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });
            if (response.ok) {
                console.log("Rejestracja udana");
                navigate('/login');
            } else if (response.status === 400) {
                console.log("Nazwa użytkownika jest już zajęta");
            } else {
                console.error("Błąd podczas rejestracji:", response.statusText);
            }
        } catch (err) {
            console.error("Błąd podczas rejestracji:", err);
        }
    };

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
    
            if (response.status === 200) {
                console.log("Logowanie udane");
                localStorage.setItem('isLoggedIn', true);
                
                
                const data = await response.json();
                
                if (data.id === 2) {
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

    return (
        
        <div>
        <nav className="navbar">
        <div className="left-items">
            <a href="home">Home</a>
            <a href="menu">Menu</a>
            <a href="opinie">Oceny</a>
            <a href="orders">Zamówienia</a>
        </div>
        <div className="right-items">
            <a href="login">Logowanie</a>
            <a href="register">Rejestracja</a>
        </div>
        </nav>

    <div className="signup-container">
   

    <h2>Rejestracja</h2>
    <form onSubmit={handleSubmit} id="register" >
        <label htmlFor="login">Login:</label>
        <input type="text" id="login" name="login" required onChange={(e) => setLogin(e.target.value)}/>
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="registerbtn">Zarejestruj</button>
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

export default Signup;