import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CityInput from './CityInput';
import Header from './Header';
import { fetchWeatherData, getCityCoordinates } from './WeatherService';
import WeatherDisplay from "./WeatherDisplay";
import '../styles/Main.css';

const Main = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [displayType, setDisplayType] = useState('currentDay'); // 'currentDay' or 'fiveDays'

  const handleCitySelect = async (city) => {
    try {
      const apiKey = 'ffd35bef4b2502a86a950620325c3764';
      const cityCoordinates = await getCityCoordinates(city.name, apiKey);

      if (cityCoordinates) {
        const { lat, lon } = cityCoordinates;
        setSelectedCity(city);
        const data = await fetchWeatherData(lat, lon);
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error selecting city:', error);
    }
  };

  const handleDisplayTypeChange = (type) => {
    setDisplayType(type);
  };

  return (
    <Router>
      <div className="container">

        <Header />
        <h1>Погода на пять дней</h1>

        <Routes>
          <Route
            path="/"
            element={<CityInput onSelectCity={handleCitySelect} />}
          />

          <Route
            path="/weather"
            element={
              <WeatherDisplay
                key={weatherData.list && weatherData.list[0] && weatherData.list[0].dt}
                name={selectedCity.name}
                weatherData={weatherData}
                displayType={displayType}
                onDisplayTypeChange={handleDisplayTypeChange}
              />
            }
          />

        </Routes>

        {/*<div>*/}
        {/*  <Link to="/weather" onClick={() => handleDisplayTypeChange('currentDay')}>Показать погоду на текущий день</Link>*/}
        {/*  <Link to="/weather" onClick={() => handleDisplayTypeChange('fiveDays')}>Показать погоду на пять дней</Link>*/}
        {/*</div>*/}

      </div>
    </Router>
  );
};

export default Main;
