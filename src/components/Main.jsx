// Main.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityInput from './CityInput';
import Header from './Header';
import { fetchWeatherData, getCityCoordinates } from './WeatherService';
import WeatherDisplay from "./WeatherDisplay";
import '../styles/Main.css';

/**
 * Main component is the main container component that manages the application state and renders other components.
 *
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
const Main = () => {
  // State to track the selected city, weather data, and display type
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [displayType, setDisplayType] = useState('currentDay');

  /**
   * Handles the selection of a city and fetches weather data for the selected city.
   *
   * @param {Object} city - The selected city object.
   */
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

  /**
   * Handles the change in display type (e.g., current day, hourly, etc.).
   *
   * @param {string} type - The new display type.
   */
  const handleDisplayTypeChange = (type) => {
    setDisplayType(type);
  };

  return (
    <Router>
      <div className="container">

        {/* Header component */}
        <Header />

        <Routes>
          {/* Route for the CityInput component */}
          <Route
            path="/"
            element={<CityInput onSelectCity={handleCitySelect} />}
          />

          {/* Route for the WeatherDisplay component */}
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
      </div>
    </Router>
  );
};

export default Main;
