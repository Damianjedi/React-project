import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherImage, setWeatherImage] = useState('');

  const weatherImages = {
    Clear: 'img/clear.png',
    Rain: 'img/rain.png',
    Snow: 'img/snow.png',
    Clouds: 'img/cloud.png',
    Mist: 'img/mist.png',
    Haze: 'img/mist.png',
    Default: 'img/cloud.png'
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Gdansk&units=metric&lang=pl&appid=1453ee0a513dabbc0afab7ba1c8f8698`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);

        const weatherMain = data.weather[0].main;
        setWeatherImage(weatherImages[weatherMain] || weatherImages['Default']);

        console.log(data); // You can see all the weather data in console log
      } else {
        console.error('Błąd podczas pobierania danych pogodowych:', response.statusText);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych pogodowych:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Opis: {weatherData.weather[0].description}</p>
          <p>Odczuwalna: {weatherData.main.feels_like}°C</p>
          <p>Wilgotnosc: {weatherData.main.humidity}%</p>
          <p>Cisnienie: {weatherData.main.pressure}hPa</p>
          <p>Predkosc wiatru: {weatherData.wind.speed}m/s</p>
          <img src={weatherImage} alt={weatherData.weather[0].description} />
        </>
      ) : (
        <p>Ładowanie danych pogodowych...</p>
      )}
    </div>
  );
};

export default Weather;