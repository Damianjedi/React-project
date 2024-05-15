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
                navigate('/home');
            } else if (response.status === 400) {
                console.log("Nazwa użytkownika jest już zajęta");
            } else {
                console.error("Błąd podczas rejestracji:", response.statusText);
            }
        } catch (err) {
            console.error("Błąd podczas rejestracji:", err);
        }
    };
    return (
        
        <div>
        <nav className="navbar">
        <div className="left-items">
            <a href="home">Home</a>
            <a href="menu">Menu</a>
            <a href="oceny">Oceny</a>
            <a href="#">Zamówienia</a>
        </div>
        <div className="right-items">
            <a href="register">Logowanie</a>
            <a href="register">Rejestracja</a>
        </div>
        </nav>

    <div className="container">
    <h1>Logowanie</h1>
    <form id="login">
        <label htmlFor="login">Login:</label>
        <input type="text" id="username2" name="login" required/>
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password2" name="password" required/>
        <button type="submit" className="loginbtn">Zaloguj</button>
    </form>

    <h2>Rejestracja</h2>
    <form onSubmit={handleSubmit} id="register" >
        <label htmlFor="login">Login:</label>
        <input type="text" id="login" name="login" required onChange={(e) => setLogin(e.target.value)}/>
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="registerbtn">Zarejestruj</button>
    </form>
    </div>

    </div>


    )
}

export default Signup;