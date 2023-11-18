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

  const weatherToDisplay = displayType === 'fiveDays' ? getDailyWeather(weatherData.list) : getTodayWeather(weatherData.list);

  return (
    <div className="weather-table">
      <h2>Погода в городе {name}</h2>

      <Button
        variant={displayType === 'fiveDays' ? 'primary' : 'secondary'}
        onClick={() => onDisplayTypeChange(displayType === 'fiveDays' ? 'today' : 'fiveDays')}
        className="custom-button"
      >
        {displayType === 'fiveDays' ? 'Сейчас' : 'Ближайшие пять дней'}
      </Button>

      <Table striped bordered hover variant="success">
        <thead>
        <tr>
          <th>Дата и время</th>
          <th>Температура</th>
          <th>Описание</th>
          <th>Давление</th>
          <th>Осадки</th>
          <th>Влажность</th>
        </tr>
        </thead>
        <tbody>
        {weatherToDisplay.map((weatherItem) => (
          <tr key={weatherItem.dt}>
            <td>{weatherItem.dt_txt}</td>
            <td>{weatherItem.main.temp}&deg;C</td>
            <td>{weatherItem.weather[0].description}</td>
            <td>{weatherItem.main.pressure} hPa</td>
            <td>{weatherItem.rain ? `${weatherItem.rain['3h']} mm` : '0 mm'}</td>
            <td>{weatherItem.main.humidity}%</td>
          </tr>
        ))}
        </tbody>
      </Table>

    </div>
  );
};

const getDailyWeather = (weatherList) => {
  const dailyWeather = {};
  weatherList.forEach((weatherItem) => {
    const date = weatherItem.dt_txt.split(' ')[0];
    if (!dailyWeather[date] || weatherItem.dt_txt.split(' ')[1] === '12:00:00') {
      dailyWeather[date] = weatherItem;
    }
  });
  return Object.values(dailyWeather);
};

const getTodayWeather = (weatherList) => {
  const today = new Date().toISOString().split('T')[0];
  return weatherList.filter((weatherItem) => weatherItem.dt_txt.includes(today));
};

export default WeatherDisplay;
