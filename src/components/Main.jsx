// Main.jsx
import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';

function Main() {
  const [name, setName] = useState('Moscow');
  const [weathers, setWeathers] = useState([]);

  const handleNameChange = (name) => {
    setName(name);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name},ru&APPID=fe4c586fd2c32a2e3e13d3ad079f4ea1&units=metric`;

    axios.get(weatherUrl).then((res) => {
      setWeathers(res.data.list);
    });
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => handleNameChange(name)}>Get Weather</button>
      <WeatherDisplay name={name} weatherData={weathers} />
    </div>
  );
}

export default Main;
