// CityInput.jsx
import React from 'react';
import JsonFile from '../cities/cities.json';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

/**
 * CityInput component displays a list of cities and allows the user to select a city.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Function} props.onSelectCity - Callback function to handle the selection of a city.
 * @returns {JSX.Element} - Rendered component.
 */
const CityInput = ({ onSelectCity }) => {
  const navigate = useNavigate();

  /**
   * Handles the selection of a city.
   *
   * @param {Object} selectedCity - The selected city data.
   */
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
              <button className="input-button" onClick={() => handleSelectCity(cityData)}>Выбрать</button>
            </td>
            <td onClick={() => handleSelectCity(cityData)}>{cityData.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityInput;
