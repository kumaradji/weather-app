import React, { useEffect } from 'react';
import '../styles/Main.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const WeatherDisplay = ({ name, weatherData, displayType, onDisplayTypeChange }) => {
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

  const weatherToDisplay = displayType === 'currentDay' ? [weatherData.list[0]] : weatherData.list.slice(0, 5);

  return (
    <div className="weather-display">
      <h2>Погода в городе {name}</h2>

      <Button onClick={() => onDisplayTypeChange('fiveDays')} variant={displayType === 'fiveDays' ? 'primary' : 'secondary'}>
        Показать погоду на пять дней
      </Button>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Дата и время</th>
          <th>Температура</th>
          <th>Описание</th>
        </tr>
        </thead>
        <tbody>
        {weatherToDisplay.map((weatherItem) => (
          <tr key={weatherItem.dt}>
            <td>{weatherItem.dt_txt}</td>
            <td>{weatherItem.main.temp}&deg;C</td>
            <td>{weatherItem.weather[0].description}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WeatherDisplay;
