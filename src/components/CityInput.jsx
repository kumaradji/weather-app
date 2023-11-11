import React, { useState } from 'react';
import JsonFile from '../cities/cities.json';
import "../styles/CityInput.css";

const CityInput = ({ onSelectCity }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value.toLowerCase());
  };

  const handleSelectCity = () => {
    if (city.trim() !== '') {
      const selectedCity = JsonFile.find((cityData) => {
        return cityData.name.toLowerCase().includes(city);
      });

      if (selectedCity) {
        onSelectCity(selectedCity);
      } else {
        alert('Город не найден. Выберите город из списка.');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={handleSelectCity}>Выбрать город</button>
    </div>
  );
};

export default CityInput;
