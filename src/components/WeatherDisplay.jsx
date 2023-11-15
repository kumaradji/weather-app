// WeatherDisplay.jsx
import React, { useEffect } from 'react';

console.log('WeatherDisplay.jsx is imported');

const WeatherDisplay = ({ name, weatherData }) => {
  console.log('WeatherDisplay Rendered');

  console.log('Props in WeatherDisplay:', { name, weatherData });

  useEffect(() => {
    console.log('WeatherDisplay Mounted');
    return () => {
      console.log('WeatherDisplay Unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('WeatherDisplay Updated', { name, weatherData });
  }, [name, weatherData]);

  console.log('WeatherData in WeatherDisplay:', weatherData);

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    console.log('WeatherDisplay: No weather data');
    return <p>Данные о погоде отсутствуют</p>;
  }

  const currentWeather = weatherData.list[0];
  const temperature = currentWeather.main.temp;
  const description = currentWeather.weather[0].description;

  console.log('Props:', { name, weatherData });

  return (
    <div>
      <h2>Погода в городе {name}</h2>
      <p>Температура: {temperature}°C</p>
      <p>Описание: {description}</p>
      {/* Добавьте дополнительные детали погоды, если необходимо */}
    </div>
  );
};

export default WeatherDisplay;
