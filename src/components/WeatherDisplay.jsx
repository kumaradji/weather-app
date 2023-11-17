// WeatherDisplay.jsx
import React, { useEffect } from 'react';
import '../styles/WeatherDisplay.css';

const WeatherDisplay = ({ name, weatherData }) => {
  useEffect(() => {
    console.log('WeatherDisplay Updated', { name, weatherData });

    if (weatherData && weatherData.list && weatherData.list.length > 0) {
      console.log('WeatherData in WeatherDisplay:', weatherData);
    } else {
      console.log('WeatherDisplay: No weather data');
    }
  }, [name, weatherData]);

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <p className="weather-display-error">Данные о погоде отсутствуют</p>;
  }

  const currentWeather = weatherData.list[0];
  const temperature = currentWeather.main.temp;
  const description = currentWeather.weather[0].description;

  return (
    <div className="weather-display">

      <h2>Погода в городе {name}</h2>
      <p>Погода на: {currentWeather.dt_txt}</p>
      <p>Температура: {temperature}°C</p>
      <p>Описание: {description}</p>
    </div>
  );
};

export default WeatherDisplay;
