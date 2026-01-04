/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';

// Base URL for API requests
// In production (Vercel), API routes are on the same domain
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

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`📥 Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Get all saved cities with weather data
 * @returns {Promise<Array>} Array of city weather objects
 */
export const getAllCities = async () => {
  try {
    const response = await api.get('/weather');
    return response.data.data;
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
    const response = await api.get(`/weather/${encodeURIComponent(cityName)}`);
    return response.data.data;
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
    const response = await api.post('/weather', { cityName });
    return response.data.data;
  } catch (error) {
    console.error(`Error adding city ${cityName}:`, error);
    throw error;
  }
};

/**
 * Delete a city from the saved list
 * @param {string} cityId - MongoDB ObjectId of the city
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteCity = async (cityId) => {
  try {
    const response = await api.delete(`/weather/${cityId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting city ${cityId}:`, error);
    throw error;
  }
};

/**
 * Refresh weather data for a specific city
 * @param {string} cityId - MongoDB ObjectId of the city
 * @returns {Promise<Object>} Updated weather data
 */
export const refreshCityWeather = async (cityId) => {
  try {
    const response = await api.put(`/weather/${cityId}/refresh`);
    return response.data.data;
  } catch (error) {
    console.error(`Error refreshing city ${cityId}:`, error);
    throw error;
  }
};

/**
 * Check API health
 * @returns {Promise<Object>} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};

export default api;
