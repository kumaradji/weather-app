// Main.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityInput from './CityInput';
import Header from './Header';
import { fetchWeatherData, getCityCoordinates } from './WeatherService';
import WeatherData from './WeatherData';
import WeatherDisplay from "./WeatherDisplay";

const Main = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    console.log('Main Rendered');
  });

  useEffect(() => {
    console.log('Main Mounted');
    return () => {
      console.log('Main Unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('Main Updated', { selectedCity, weatherData });
  }, [selectedCity, weatherData]);

  const handleCitySelect = async (city) => {
    try {
      const apiKey = 'ffd35bef4b2502a86a950620325c3764';
      const cityCoordinates = await getCityCoordinates(city.name, apiKey);

      if (cityCoordinates) {
        const { lat, lon } = cityCoordinates;
        const data = await fetchWeatherData(lat, lon);
        setWeatherData(data);
      }
      setSelectedCity(city);
    } catch (error) {
      console.error('Error selecting city:', error);
    }
  };

  return (
    <Router>
      <div>
        <Header />
        <h1>Погода</h1>
        <Routes>
          <Route
            path="/"
            element={<CityInput onSelectCity={handleCitySelect} />}
          />
          <Route
            path="/weather"
            element={
              <>
                <WeatherDisplay name={selectedCity.name} weatherData={weatherData} />
                {weatherData && (
                  <div>
                    <h2>Информация о городе {selectedCity.name}</h2>
                    <WeatherData weatherData={weatherData.list[0]} />
                  </div>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
