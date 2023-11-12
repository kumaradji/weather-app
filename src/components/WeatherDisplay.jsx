// WeatherDisplay.jsx
import React from 'react';
import WeatherData from './Weather';

const WeatherDisplay = ({ name, weatherData }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>
        {weatherData.map(weather => (
          <WeatherData key={weather.main.dt} weatherData={weather} />
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
