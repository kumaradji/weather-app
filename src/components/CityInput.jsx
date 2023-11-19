// CityInput.jsx
import React from 'react';
import JsonFile from '../cities/cities.json';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';
import { citiesDictionary } from '../constants/citiesDictionary';

const CityInput = ({ onSelectCity }) => {
  const navigate = useNavigate();

  const handleSelectCity = (selectedCity) => {
    console.log('Selected City:', selectedCity);
    onSelectCity(selectedCity);
    navigate('/weather');
  };

  return (
    <div className="city-input">
      <h1>Выберите город из списка:</h1>
      <table>
        <tbody className="city-list">
        {JsonFile.map((cityData) => (
          <tr className="city-name" key={cityData.id}>
            <td className="button-cell">
              <button className="input-button" onClick={() => handleSelectCity(cityData)}>
                Выбрать
              </button>
            </td>
            <td>{citiesDictionary[cityData.name]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityInput;
