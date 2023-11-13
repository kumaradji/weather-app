// WeatherDisplay.jsx
import React from 'react';
import WeatherData from './Weather';

const WeatherDisplay = ({ name, weatherData }) => {
  return (
    <div>
      <h1>{name}</h1>
      {weatherData.city && (
        <div>
          <h2>Информация о городе {weatherData.city.name}</h2>
          {/* Добавьте другие компоненты для отображения информации о городе */}
        </div>
      )}
      <div>
        {weatherData.list.map(weather => (
          <WeatherData key={weather.dt_txt} weatherData={weather} />
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
