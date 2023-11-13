import axios from 'axios';

const API_KEY = 'ffd35bef4b2502a86a950620325c3764';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        exclude: 'minutely',
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export { fetchWeatherData };


