import React, {useState, useEffect} from "react";
import Weather from "./weather";
import "./Home.css";


function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function ImageWithBorder({ src, alt }) {
  return <img className="image-with-border" src={src} alt={alt} />;
}


function MyComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLogout = () => {
    // Usuwanie konkretnych kluczy z localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    
    // Usuwanie wszystkich danych z localStorage
    localStorage.clear();
    
    // Usuwanie wszystkich danych z sessionStorage
    sessionStorage.clear();
    
    // Usuwanie cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    });
    window.location.href = '/home';
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

    
<>

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
            <a href="home" onClick={handleLogout}>
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




      <div className="container">
        <section className="hero-section">
          <div className="hero-text">
            <div className="hero-text-content">
              <h1>
                <strong>KEBABEE</strong>
              </h1>
              <p>
                <strong>
                  <span className="ql-cursor"></span>
                </strong>
              </p>
              <p>
                <span style={{ fontSize: "16px" }}>
                  Witaj w naszym autentycznym kawałku Turcji, gdzie smak i aromat
                  łączą się w magiczny taniec brzucha przy każdym kęsie. Zapraszamy do
                  naszego lokalu gastronomicznego, gdzie serwujemy najwyższej
                  jakości kebaby, przygotowane z pasją i tradycją, które
                  przeniosą Cię prosto na ulice Stambułu.
                </span>
              </p>
            </div>
          </div>
          <div className="main-image">
            <ImageWithBorder
              src="https://www.guldfageln.se/app/uploads/2020/12/ChickenKebab_pitabrod.jpg"
            />
          </div>
        </section>
      </div>

      <div className="cta-section">
        <section className="section">
          <div className="cta-container">
            <div className="cta-content">
              <div className="cta-row">
                <div className="hero-text">
                  <Button>SPRAWDZ MENU</Button>
                </div>
                <div className="cta-text">
                  <div className="cta-text-content">
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        W naszej kuchni używamy tylko świeżych i naturalnych
                        składników, aby dostarczyć Ci niezapomniane doznania
                        smakowe. Nasze mięso jest starannie wyselekcjonowane, a
                        przyprawy, którymi je doprawiamy, są tajemniczym
                        symbolem turkmeńskiego rzemiosła kulinarnej sztuki.{" "}
                      </span>
                      <strong>Glodny? Zamow juz teraz!</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="review-section">
        <section className="section">
          <div className="review-content">
            <div className="review-row">
              <div className="hero-text">
                <div className="review-text">
                  <p>
                    Posiłek smakował? Jestes zadowolony/-a z jakosci obslugi i
                    jedzenia? <strong>Zostaw swoja opinie!</strong>
                  </p>
                </div>
                <Button>OCEN</Button>
              </div>
              <div className="review-image">
                <img
                  className="review-image-content"
                  src="https://cdn.builder.io/api/v1/image/assets%2F2182ec7e4b424e46ad77e739f9fef46e%2Ff676436fdc584e6c809bedc906377d9f"
                  alt="Satisfied customer enjoying kebab"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="home-weather">
          <div className="home-weather-content">
      <Weather />
      </div>
        <div className="home-weather-icon">
        </div>
    </div>

      <footer className="footer">
        <p className ="copyright">
            KEBABEE Copyright 
            <span className="year">© 2024</span> - 
            All rights reserved
        </p>
    </footer>
      
    </>
  );
}


export default MyComponent;

