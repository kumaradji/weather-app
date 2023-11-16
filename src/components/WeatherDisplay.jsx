// WeatherDisplay.jsx

import React from 'react';

const WeatherDisplay = ({name, weatherData}) => {

  // Лог пропсов
  console.log('Props in WeatherDisplay:', {name, weatherData});

  // Вывод пропса name
  return (
    <h2>Погода в городе {name}</h2>
  );

};

export default WeatherDisplay;