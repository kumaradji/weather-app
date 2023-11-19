// WeatherDisplay.jsx
import React, { useEffect } from 'react';
import '../styles/Main.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { citiesDictionary } from '../constants/citiesDictionary';

/**
 * WeatherDisplay component renders weather information for a selected city.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the selected city.
 * @param {Object} props.weatherData - The weather data for the selected city.
 * @param {string} props.displayType - The type of weather display ('today' or 'fiveDays').
 * @param {function} props.onDisplayTypeChange - Function to handle the change in display type.
 * @returns {JSX.Element} - Rendered component.
 */
const WeatherDisplay = ({ name, weatherData, displayType, onDisplayTypeChange }) => {
  // Effect to log updates and weather data changes
  useEffect(() => {
    console.log('WeatherDisplay Updated', { name, weatherData });

    if (weatherData && weatherData.list && weatherData.list.length > 0) {
      console.log('WeatherData in WeatherDisplay:', weatherData);
    } else {
      console.log('WeatherDisplay: No weather data');
    }
  }, [name, weatherData]);

  // Check if weather data is not available
  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <p className="weather-display-error">Данные о погоде отсутствуют</p>;
  }

  // Get the weather data to display based on the display type
  const weatherToDisplay = displayType === 'fiveDays' ? getDailyWeather(weatherData.list) : getTodayWeather(weatherData.list);

  return (
    <div className="weather-table">
      <h2>Погода в городе {citiesDictionary[name]}</h2>

      {/* Button to switch between today and five days display */}
      <Button
        variant={displayType === 'fiveDays' ? 'primary' : 'secondary'}
        onClick={() => onDisplayTypeChange(displayType === 'fiveDays' ? 'today' : 'fiveDays')}
        className="custom-button"
      >
        {displayType === 'fiveDays' ? 'Сейчас' : 'Ближайшие пять дней'}
      </Button>

      {/* Weather data table */}
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
        {/* Render weather data rows */}
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

/**
 * Function to filter daily weather data from the complete weather list.
 *
 * @param {Object[]} weatherList - The complete weather data list.
 * @returns {Object[]} - Filtered daily weather data.
 */
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

/**
 * Function to get today's weather data from the complete weather list.
 *
 * @param {Object[]} weatherList - The complete weather data list.
 * @returns {Object[]} - Today's weather data.
 */
const getTodayWeather = (weatherList) => {
  const today = new Date().toISOString().split('T')[0];
  return weatherList.filter((weatherItem) => weatherItem.dt_txt.includes(today));
};

export default WeatherDisplay;
