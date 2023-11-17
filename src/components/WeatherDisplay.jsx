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

  // Ограничиваем количество дней, которые мы хотим показать (в данном случае первые 5 дней)
  const daysToShow = weatherData.list.slice(0, 5);

  return (
    <div className="weather-display">
      <h2>Погода в городе {name}</h2>

      {daysToShow.map((day) => (
        <div key={day.dt}>
          <p>Дата: {day.dt_txt}</p>
          <p>Температура: {day.main.temp}°C</p>
          <p>Описание: {day.weather[0].description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;
