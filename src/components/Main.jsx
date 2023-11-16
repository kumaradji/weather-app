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
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    console.log('Main Updated', { selectedCity, weatherData });
  }, [selectedCity, weatherData]);

  const handleCitySelect = async (city) => {
    try {
      const apiKey = 'ffd35bef4b2502a86a950620325c3764';
      const cityCoordinates = await getCityCoordinates(city.name, apiKey);

      if (cityCoordinates) {
        const { lat, lon } = cityCoordinates;
        setSelectedCity(city); // Обновить selectedCity сначала
        const data = await fetchWeatherData(lat, lon);
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error selecting city:', error);
    }
  };


  return (
    <Router>
      <div>

        {console.log('Props for WeatherDisplay:', {
          name: selectedCity.name,
          weatherData: weatherData
        })}
        {console.log('Selected city in Main', selectedCity)}
        {console.log('Weather data in Main', weatherData)}
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
                {weatherData &&
                  <>
                    <WeatherDisplay
                      name={selectedCity.name}
                      weatherData={weatherData}
                    />
                    {
                      weatherData.list &&
                      <>
                        <WeatherData weatherData={weatherData.list[0]} />
                        {console.log('WeatherData.list[0]:', weatherData.list[0])}
                      </>
                    }
                  </>
                }

              </>
            }
          />
        </Routes>

        <WeatherDisplay />

      </div>
    </Router>
  );
};

export default Main;
