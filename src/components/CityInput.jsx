// CityInput.jsx
import React from 'react';
import JsonFile from '../cities/cities.json';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

const CityInput = ({ onSelectCity }) => {
  const navigate = useNavigate();

  const handleSelectCity = (selectedCity) => {
    console.log('Selected City:', selectedCity);
    onSelectCity(selectedCity);
    navigate('/weather');
  };

  return (
    <div className="city-input">
      <h2>Выберите город из списка:</h2>
      <table>
        <thead>
        <tr>
          <th>Город</th>
        </tr>
        </thead>
        <tbody>
        {JsonFile.map((cityData) => (
          <tr key={cityData.id}>
            <td onClick={() => handleSelectCity(cityData)}>{cityData.name}</td>
            <td>
              <button onClick={() => handleSelectCity(cityData)}>Выбрать</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityInput;
