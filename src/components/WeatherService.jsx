// WeatherService.jsx

/**
 * API key for accessing OpenWeatherMap API.
 * @type {string}
 */
const API_KEY = 'ffd35bef4b2502a86a950620325c3764';

/**
 * Base URL for the OpenWeatherMap forecast API.
 * @type {string}
 */
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

/**
 * Fetch weather data for a specific location using latitude and longitude.
 *
 * @async
 * @function
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<Object>} - Promise that resolves to the weather data.
 * @throws {Error} - Throws an error if there is an issue fetching the data.
 */
const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Get the coordinates (latitude and longitude) of a city using its name.
 *
 * @async
 * @function
 * @param {string} city - The name of the city.
 * @param {string} apiKey - The API key for accessing the OpenWeatherMap API.
 * @returns {Promise<Object|null>} - Promise that resolves to the coordinates (lat, lon) or null if not found.
 */
const getCityCoordinates = async (city, apiKey) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      if (lat && lon) {
        return { lat, lon };
      } else {
        console.error('Incomplete coordinates data:', data[0]);
      }
    } else {
      console.error('City coordinates not found or incomplete data.');
    }

    return null;
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    return null;
  }
};

export { fetchWeatherData, getCityCoordinates };
