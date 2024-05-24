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
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}hPa</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p>Ładowanie danych pogodowych...</p>
      )}
    </div>
  );
};

export default Weather;