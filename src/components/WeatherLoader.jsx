// WeatherLoader.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityInput from './CityInput';
import Header from './Header';
import WeatherDisplay from './WeatherDisplay';
import { fetchWeatherData, getCityCoordinates } from './WeatherService';
import WeatherData from "./Weather";

const WeatherLoader = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCitySelect = async (city) => {
    const apiKey = 'ffd35bef4b2502a86a950620325c3764';
    const cityCoordinates = await getCityCoordinates(city, apiKey);

    if (cityCoordinates) {
      const { lat, lon } = cityCoordinates;
      const data = await fetchWeatherData(lat, lon, apiKey);
      setWeatherData(data);
    }
    setSelectedCity(city);
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
                <WeatherDisplay name={selectedCity} weatherData={weatherData} />
                {weatherData && (
                  <div>
                    <h2>Информация о городе {selectedCity}</h2>
                    <WeatherData weatherData={weatherData.list[0]} />
                    {/* Добавьте другие компоненты для отображения информации о городе */}
                  </div>
                )}
                {console.log(weatherData)}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default WeatherLoader;
