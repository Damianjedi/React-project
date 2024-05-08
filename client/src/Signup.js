import "./Signup.css";
import {useState} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Signup() {
    const [login, setLogin] = useState()
    const [password , setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register',{login, password})
        .then(result => {console.log(result)
        navigate('/register')
        })
        .catch(err => console.log(err))
    }
    return (
        
        <div>
        <nav className="navbar">
        <div className="left-items">
            <a href="home">Home</a>
            <a href="menu">Menu</a>
            <a href="#">Oceny</a>
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
        <label htmlFor="username">Login:</label>
        <input type="text" id="username2" name="username" required/>
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password2" name="password" required/>
        <button type="submit" className="loginbtn">Zaloguj</button>
    </form>

    <h2>Rejestracja</h2>
    <form onSubmit={handleSubmit} id="register" >
        <label htmlFor="username">Login:</label>
        <input type="text" id="username1" name="username" required onChange={(e) => setLogin(e.target.value)}/>
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password1" name="password" required onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="registerbtn">Zarejestruj</button>
    </form>
    </div>

    </div>


    )
}

export default Signup;