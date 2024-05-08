import React from "react";



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
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 50px;
        }

        .hero-section {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .hero-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .hero-text {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 0px;
        }

        @media (max-width: 991px) {
          .hero-text {
            width: 100%;
          }
        }

        .hero-text-content {
          position: center;
          height: auto;
          margin: auto auto auto 10px;
        }

        .hero-image {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .hero-image {
            width: 100%;
          }
        }

        .image-with-border {
          aspect-ratio: 1.78;
          object-fit: cover;
          object-position: center;
          width: 100%;
          min-height: 20px;
          min-width: 20px;
          overflow: hidden;
          max-width: 578px;
          border-style: ridge;
          border-width: 1px;
          border-radius: 15px;
          margin: 20px 20px 0 0;
        }

        .cta-section {
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 100px;
          padding: 20px;
        }

        .section {
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 100px;
          padding: 20px;
          width: 100%;
          align-self: stretch;
          flex-grow: 1;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-container {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 20px;
          height: auto;
          padding-bottom: 30px;
          border-width: 1px;
          border-style: solid;
          border-color: rgba(255, 255, 255, 1);
        }

        .cta-content {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 20px;
        }

        .cta-row {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .cta-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .button {
          all: unset;
          display: flex;
          flex-direction: column;
          position: relative;
          appearance: none;
          color: rgba(139, 87, 42, 1);
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
          border-style: ridge;
          border-width: 2px;
          font-weight: 600;
          width: auto;
          align-self: center;
          box-shadow: 1px 1px 3px 0 rgba(139, 87, 42, 1);
          margin: auto;
          padding: 15px 25px;
        }

        .cta-text {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .cta-text {
            width: 100%;
          }
        }

        .cta-text-content {
          position: relative;
          height: auto;
          margin: auto 0;
        }

        @media (max-width: 640px) {
          .cta-text-content {
            margin-top: 20px;
          }
        }

        .review-section {
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 100px;
          padding: 20px;
        }

        .review-content {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 20px;
        }

        .review-row {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .review-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .review-text {
          position: relative;
          margin-top: 20px;
          height: auto;
        }

        .review-image {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .review-image {
            width: 100%;
          }
        }

        .review-image-content {
          aspect-ratio: 1;
          object-fit: cover;
          object-position: center;
          width: 100%;
          min-height: 20px;
          min-width: 20px;
          overflow: hidden;
          max-width: 250px;
          margin: 20px auto 0;
        }
      `}</style>

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
                  łączą się w magiczny taniec przy każdym kęsie. Zapraszamy do
                  naszego lokalu gastronomicznego, gdzie serwujemy najwyższej
                  jakości kebaby, przygotowane z pasją i tradycją, które
                  przeniosą Cię prosto na ulice Stambułu.
                </span>
              </p>
            </div>
          </div>
          <div className="hero-image">
            <ImageWithBorder
              src="https://cdn.builder.io/api/v1/image/assets%2F2182ec7e4b424e46ad77e739f9fef46e%2Fdea9a774b80740a6ba41bef50a5fa4b4"
              alt="Authentic Turkish kebab dish"
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
    </>
  );
}

export default MyComponent;

