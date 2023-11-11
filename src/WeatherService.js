import axios from 'axios';

const API_KEY = '6b9d24111f60446dc8604e732a20abbb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall';

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
