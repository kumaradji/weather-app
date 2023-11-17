// CityInput.jsx
import React from 'react';
import JsonFile from '../cities/cities.json';
import {useNavigate} from "react-router-dom";
import "../styles/Main.css";

const CityInput = ({ onSelectCity }) => {
  const navigate = useNavigate();

  const handleSelectCity = (selectedCity) => {
    console.log('Selected City:', selectedCity);
    onSelectCity(selectedCity);
    navigate('/weather'); // Перенаправление на страницу погоды
  };

  return (
    <div className="city-input">
      <h2>Выберите город из списка:</h2>
      <ul>
        {JsonFile.map((cityData) => (
          <li key={cityData.id} onClick={() => handleSelectCity(cityData)}>
            {cityData.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityInput;
