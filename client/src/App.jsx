/**
 * Main App Component
 * Manages the application state and orchestrates all components
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CityCarousel from './components/CityCarousel';
import { getAllCities, addCity, deleteCity } from './services/api';
import './styles/App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch all cities on component mount
  useEffect(() => {
    fetchCities();
  }, []);

  /**
   * Fetch all saved cities from the backend
   */
  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCities();
      setCities(data);
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to load cities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle adding a new city
   */
  const handleAddCity = async (cityName) => {
    try {
      setSearchLoading(true);
      setError(null);
      
      const newCity = await addCity(cityName);
      
      // Check if city already exists
      const cityExists = cities.some(city => city._id === newCity._id);
      
      if (!cityExists) {
        setCities(prevCities => [...prevCities, newCity]);
      }
      
      return { success: true, message: 'City added successfully!' };
    } catch (err) {
      console.error('Error adding city:', err);
      const errorMessage = err.response?.data?.message || 'Failed to add city. Please check the name and try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setSearchLoading(false);
    }
  };

  /**
   * Handle removing a city
   */
  const handleDeleteCity = async (cityId) => {
    try {
      await deleteCity(cityId);
      setCities(prevCities => prevCities.filter(city => city._id !== cityId));
    } catch (err) {
      console.error('Error deleting city:', err);
      setError('Failed to remove city. Please try again.');
    }
  };

  /**
   * Handle refreshing city data
   */
  const handleRefresh = () => {
    fetchCities();
  };

  return (
    <div className="app">
      {/* Animated background elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="app-container">
        {/* Header with live date and time */}
        <Header />

        {/* Search bar for adding cities */}
        <SearchBar 
          onAddCity={handleAddCity} 
          loading={searchLoading}
        />

        {/* Error message display */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
            <button 
              className="error-close"
              onClick={() => setError(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && cities.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🌍</div>
            <h2>No Cities Added Yet</h2>
            <p>Search for a city above to get started!</p>
            <div className="example-cities">
              <p>Try: London, Paris, Tokyo, New York</p>
            </div>
          </div>
        )}

        {/* City carousel with weather cards */}
        {!loading && cities.length > 0 && (
          <CityCarousel 
            cities={cities}
            onDeleteCity={handleDeleteCity}
            onRefresh={handleRefresh}
          />
        )}

        {/* Footer */}
        <footer className="app-footer">
          <p>Powered by OpenWeatherMap API</p>
          <p className="footer-divider">•</p>
          <p>Built with ❤️ using MERN Stack</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
