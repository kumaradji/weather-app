import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CityInput from './components/CityInput.jsx';
import Header from './components/Header.jsx';
import WeatherDisplay from './components/WeatherDisplay.jsx';
import { fetchWeatherData } from './WeatherService';

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCitySelect = async (city) => {
    // Получение координат города через геокодинг (или другим способом)
    const cityCoordinates = await getCityCoordinates(city);
    if (cityCoordinates) {
      const { lat, lon } = cityCoordinates;
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
    }
    setSelectedCity(city);
  };

  const getCityCoordinates = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=YOUR_API_KEY`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat, lon };
      } else {
        console.error('City coordinates not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
      return null;
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
            element={<WeatherDisplay weatherData={weatherData} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
