/**
 * WeatherCard Component
 * Displays weather information for a single city with glassmorphism effect
 */

import React from 'react';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherIcons';

const WeatherCard = ({ city, onDelete }) => {
  /**
   * Handle delete button click
   */
  const handleDelete = () => {
    if (window.confirm(`Remove ${city.cityName} from your list?`)) {
      onDelete(city._id);
    }
  };

  // Check if there's an error for this city
  if (city.error) {
    return (
      <div className="weather-card error-card">
        <button className="delete-button" onClick={handleDelete}>✕</button>
        <div className="card-error">
          <span className="error-icon-large">⚠️</span>
          <h3>{city.cityName}</h3>
          <p>{city.error}</p>
        </div>
      </div>
    );
  }

  // Get gradient for card background based on weather condition
  const gradient = getWeatherGradient(city.condition);

  return (
    <div 
      className="weather-card"
      style={{ background: gradient }}
    >
      {/* Delete button */}
      <button 
        className="delete-button"
        onClick={handleDelete}
        aria-label="Remove city"
      >
        ✕
      </button>

      {/* City name and country */}
      <div className="card-header">
        <h2 className="city-name">
          {city.cityName}
          {city.country && <span className="country-code">, {city.country}</span>}
        </h2>
        <p className="weather-description">{city.description}</p>
      </div>

      {/* Main weather display */}
      <div className="card-body">
        {/* Large weather icon */}
        <div className="weather-icon-large">
          {getWeatherIcon(city.condition)}
        </div>

        {/* Temperature display */}
        <div className="temperature-section">
          <div className="temperature-main">
            <span className="temperature-value">{city.temperature}</span>
            <span className="temperature-unit">°C</span>
          </div>
          <div className="temperature-feels">
            Feels like {city.feelsLike}°C
          </div>
        </div>
      </div>

      {/* Additional weather info */}
      <div className="card-footer">
        <div className="weather-condition">
          <span className="condition-icon">🌡️</span>
          <span className="condition-label">{city.condition}</span>
        </div>

        <div className="temperature-range">
          <div className="temp-high">
            <span className="temp-icon">↑</span>
            <span className="temp-value">{city.tempMax}°</span>
          </div>
          <div className="temp-divider">•</div>
          <div className="temp-low">
            <span className="temp-icon">↓</span>
            <span className="temp-value">{city.tempMin}°</span>
          </div>
        </div>
      </div>

      {/* Extra details */}
      <div className="card-details">
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{city.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind</span>
          <span className="detail-value">{city.windSpeed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🎚️</span>
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{city.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
