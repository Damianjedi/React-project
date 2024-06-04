import React from "react";
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

  return (

    
<>


        <nav className="navbar">
        <div className="left-items">
            <a href="home">Home</a>
            <a href="menu">Menu</a>
            <a href="oceny">Oceny</a>
            <a href="#">Zamówienia</a>
        </div>
        <div className="right-items">
            <a href="login">Logowanie</a>
            <a href="register">Rejestracja</a>
        </div>
        </nav>



        <div className="home-weather">
          <div className="home-weather-content">
      <Weather />
      </div>
        <div className="home-weather-icon">
        </div>
    </div>



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

      <footer>
        <div class="footer">
          <div class="row">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-youtube"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
          </div>

            <div class="row">
              <ul>
              <li><a href="#">Zamówienia</a></li>
              <li><a href="#">Regulamin</a></li>
              <li><a href="#">O nas</a></li>
              <li><a href="#">Career</a></li>
              </ul>
            </div>

          <div class="row">
          KEBABEE Copyright © 2024 - All rights reserved 
          </div>
          </div>
          </footer>
      
    </>
  );
}


export default MyComponent;

