// CityInput.jsx
import React, {useState} from 'react';
import JsonFile from '../cities/cities.json';

const CityInput = ({ onSelectCity }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value.toLowerCase());
  };

  const handleSelectCity = () => {
    if (city.trim() !== '') {
      const selectedCity = JsonFile.find((cityData) => {
        return cityData.name.toLowerCase() === city.toLowerCase();
      });

      if (selectedCity) {
        console.log('Selected City:', selectedCity);
        onSelectCity(selectedCity);
      } else {
        alert('Город не найден. Выберите город из списка.');
      }
    } else {
      alert('Выберите город перед нажатием кнопки.');
    }
  };

  return (
    <div>
      <select
        value={city}
        onChange={handleInputChange}
      >
        <option value="" disabled>Выберите город</option>
        {JsonFile.map((cityData) => (
          <option key={cityData.id} value={cityData.name.toLowerCase()}>
            {cityData.name}
          </option>
        ))}
      </select>
      <button onClick={handleSelectCity}>Выбрать город</button>
    </div>
  );
};

export default CityInput;
