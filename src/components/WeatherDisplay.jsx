import React from 'react';
import Weather from "./Weather";

const WeatherDisplay = ({ name, weatherData }) => {
  // Реализуйте отображение данных о погоде
  return (
    <>
      <h1>{name}</h1>
      {weatherData.map(weather => <Weather key={weather.main.dt} weather={weather}/>)}
    </>
  );
};

export default WeatherDisplay;
