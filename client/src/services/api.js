/**
 * API Service
 * Handles all HTTP requests to the backend API
 * Modified to use sessionStorage for per-user data isolation
 */

import axios from 'axios';

// OpenWeatherMap API configuration
const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || '7e1e5bf7766e63e8cc4daa6f37f6e85d';
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

// SessionStorage key for cities
const CITIES_STORAGE_KEY = 'weatherAppCities';

/**
 * Get cities from sessionStorage
 * @returns {Array} Array of saved cities
 */
const getCitiesFromStorage = () => {
  try {
    const stored = sessionStorage.getItem(CITIES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from sessionStorage:', error);
    return [];
  }
};

/**
 * Save cities to sessionStorage
 * @param {Array} cities - Array of cities to save
 */
const saveCitiesToStorage = (cities) => {
  try {
    sessionStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(cities));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
};

/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} Weather data
 */
const fetchWeatherFromAPI = async (cityName) => {
  try {
    const url = `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(cityName)}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    if (error.response?.status === 404) {
      throw new Error('City not found');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

/**
 * Format weather data for frontend
 * @param {Object} data - Raw weather data from API
 * @returns {Object} Formatted weather data
 */
const formatWeatherData = (data) => {
  return {
    cityName: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    tempMax: Math.round(data.main.temp_max),
    tempMin: Math.round(data.main.temp_min),
    pressure: data.main.pressure,
    coordinates: {
      lat: data.coord.lat,
      lon: data.coord.lon
    },
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
    timestamp: Date.now()
  };
};

/**
 * Get all saved cities with weather data
 * @returns {Promise<Array>} Array of city weather objects
 */
export const getAllCities = async () => {
  try {
    const cities = getCitiesFromStorage();
    
    // Fetch fresh weather data for each city
    const weatherPromises = cities.map(async (city) => {
      try {
        const weatherData = await fetchWeatherFromAPI(city.cityName);
        const formatted = formatWeatherData(weatherData);
        return {
          ...city,
          ...formatted,
        };
      } catch (error) {
        console.error(`Error fetching weather for ${city.cityName}:`, error.message);
        // Return city with error flag
        return {
          ...city,
          error: 'Unable to fetch weather data'
        };
      }
    });

    const weatherData = await Promise.all(weatherPromises);
    return weatherData;
  } catch (error) {
    console.error('Error fetching all cities:', error);
    throw error;
  }
};

/**
 * Get weather data for a specific city
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} Weather data object
 */
export const getWeatherByCity = async (cityName) => {
  try {
    const weatherData = await fetchWeatherFromAPI(cityName);
    return formatWeatherData(weatherData);
  } catch (error) {
    console.error(`Error fetching weather for ${cityName}:`, error);
    throw error;
  }
};

/**
 * Add a new city to the saved list
 * @param {string} cityName - Name of the city to add
 * @returns {Promise<Object>} Added city data
 */
export const addCity = async (cityName) => {
  try {
    // Fetch weather data first to validate the city
    const weatherData = await fetchWeatherFromAPI(cityName);
    const formatted = formatWeatherData(weatherData);
    
    // Get existing cities
    const cities = getCitiesFromStorage();
    
    // Check if city already exists
    const existingCity = cities.find(
      city => city.cityName.toLowerCase() === formatted.cityName.toLowerCase()
    );
    
    if (existingCity) {
      throw new Error('City already exists in your list');
    }
    
    // Create new city object with unique ID
    const newCity = {
      _id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...formatted,
      savedAt: new Date().toISOString()
    };
    
    // Add to storage
    const updatedCities = [...cities, newCity];
    saveCitiesToStorage(updatedCities);
    
    return newCity;
  } catch (error) {
    console.error(`Error adding city ${cityName}:`, error);
    throw error;
  }
};

/**
 * Delete a city from the saved list
 * @param {string} cityId - ID of the city
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteCity = async (cityId) => {
  try {
    const cities = getCitiesFromStorage();
    const updatedCities = cities.filter(city => city._id !== cityId);
    saveCitiesToStorage(updatedCities);
    return { success: true, message: 'City deleted successfully' };
  } catch (error) {
    console.error(`Error deleting city ${cityId}:`, error);
    throw error;
  }
};

/**
 * Refresh weather data for a specific city
 * @param {string} cityId - ID of the city
 * @returns {Promise<Object>} Updated weather data
 */
export const refreshCityWeather = async (cityId) => {
  try {
    const cities = getCitiesFromStorage();
    const city = cities.find(c => c._id === cityId);
    
    if (!city) {
      throw new Error('City not found');
    }
    
    // Fetch fresh weather data
    const weatherData = await fetchWeatherFromAPI(city.cityName);
    const formatted = formatWeatherData(weatherData);
    
    // Update the city in storage
    const updatedCities = cities.map(c => 
      c._id === cityId ? { ...c, ...formatted } : c
    );
    saveCitiesToStorage(updatedCities);
    
    return { ...city, ...formatted };
  } catch (error) {
    console.error(`Error refreshing city ${cityId}:`, error);
    throw error;
  }
};

/**
 * Clear all saved cities from session storage
 * @returns {Promise<Object>} Success message
 */
export const clearAllCities = async () => {
  try {
    sessionStorage.removeItem(CITIES_STORAGE_KEY);
    return { success: true, message: 'All cities cleared' };
  } catch (error) {
    console.error('Error clearing cities:', error);
    throw error;
  }
};

export default {
  getAllCities,
  getWeatherByCity,
  addCity,
  deleteCity,
  refreshCityWeather,
  clearAllCities,
};
