/**
 * API Service
 * Handles all HTTP requests to the backend API
 * Modified to use sessionStorage for per-user data isolation
 */

import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 
                     (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

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
 * Fetch weather data from backend API
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} Weather data
 */
const fetchWeatherFromBackend = async (cityName) => {
  try {
    const response = await api.get(`/weather/${encodeURIComponent(cityName)}`);
    return response.data.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    if (error.response?.status === 404) {
      throw new Error('City not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

/**
 * Get all saved cities with weather data
 * @returns {Promise<Array>} Array of city weather objects
 */
export const getAllCities = async () => {
  try {
    const cities = getCitiesFromStorage();
    
    if (cities.length === 0) {
      return [];
    }
    
    // Fetch fresh weather data for each city from backend
    const weatherPromises = cities.map(async (city) => {
      try {
        const weatherData = await fetchWeatherFromBackend(city.cityName);
        return {
          ...city,
          ...weatherData,
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
    return await fetchWeatherFromBackend(cityName);
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
    // Fetch weather data from backend to validate the city
    const weatherData = await fetchWeatherFromBackend(cityName);
    
    // Get existing cities from sessionStorage
    const cities = getCitiesFromStorage();
    
    // Check if city already exists
    const existingCity = cities.find(
      city => city.cityName.toLowerCase() === weatherData.cityName.toLowerCase()
    );
    
    if (existingCity) {
      throw new Error('City already exists in your list');
    }
    
    // Create new city object with unique ID
    const newCity = {
      _id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...weatherData,
      savedAt: new Date().toISOString()
    };
    
    // Add to sessionStorage
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
    
    // Fetch fresh weather data from backend
    const weatherData = await fetchWeatherFromBackend(city.cityName);
    
    // Update the city in storage
    const updatedCities = cities.map(c => 
      c._id === cityId ? { ...c, ...weatherData } : c
    );
    saveCitiesToStorage(updatedCities);
    
    return { ...city, ...weatherData };
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
