// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityInput from './components/CityInput.jsx';
import Header from './components/Header.jsx';
import WeatherDisplay from './components/WeatherDisplay.jsx';
import { fetchWeatherData } from './WeatherService';
import WeatherData from "./components/Weather";

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCitySelect = async (city) => {
    const apiKey = 'ffd35bef4b2502a86a950620325c3764';
    // Получение координат города через геокодинг (или другим способом)
    const cityCoordinates = await getCityCoordinates(city, apiKey);
    if (cityCoordinates) {
      const { lat, lon } = cityCoordinates;
      const data = await fetchWeatherData(lat, lon, apiKey);
      setWeatherData(data);
    }
    setSelectedCity(city);
  };

  const getCityCoordinates = async (city, apiKey) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
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
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
