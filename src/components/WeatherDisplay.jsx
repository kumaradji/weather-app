// WeatherDisplay.jsx
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/WeatherDisplay.css';

console.log('WeatherDisplay.jsx is imported');

const WeatherDisplay = ({ name, weatherData }) => {
  console.log('WeatherDisplay Rendered');
  console.log('Props in WeatherDisplay:', { name, weatherData });

  useEffect(() => {
    console.log('WeatherDisplay Updated', { name, weatherData });

    if (weatherData && weatherData.list && weatherData.list.length > 0) {
      console.log('WeatherData in WeatherDisplay:', weatherData);
    } else {
      console.log('WeatherDisplay: No weather data');
    }
  }, [name, weatherData]);


  console.log('WeatherData in WeatherDisplay:', weatherData);

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    console.log('WeatherDisplay: No weather data');
    return <p className="weather-display-error">Данные о погоде отсутствуют</p>;
  }

  const currentWeather = weatherData.list[0];
  const temperature = currentWeather.main.temp;
  const description = currentWeather.weather[0].description;

  console.error('Props:', { name, weatherData });

  return (
    <div className="weather-display">
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Дата и время</th>
          <th>Температура</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{currentWeather.dt_txt}</td>
          <td>{temperature}°C</td>
        </tr>
        </tbody>
      </Table>
      <h2>Погода в городе {name}</h2>
      <p>Температура: {temperature}°C</p>
      <p>Описание: {description}</p>
    </div>
  );
};

export default WeatherDisplay;
