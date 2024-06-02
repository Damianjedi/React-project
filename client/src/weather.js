import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Gdansk&units=metric&appid=1453ee0a513dabbc0afab7ba1c8f8698`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        console.log(data); //You can see all the weather data in console log
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
          <p>Wyczuwalna: {weatherData.main.feels_like}°C</p>
          <p>Wilgotnosc: {weatherData.main.humidity}%</p>
          <p>Cisnienie {weatherData.main.pressure}hPa</p>
          <p>Predkosc wiatru: {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p>Ładowanie danych pogodowych...</p>
      )}
    </div>
  );
};

export default Weather;