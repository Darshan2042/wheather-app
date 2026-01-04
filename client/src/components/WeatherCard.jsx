 /**
 * WeatherCard Component
 * Displays weather information with vibrant design and advanced React hooks
 */

import React, { useState, useEffect, useMemo, useCallback, memo, useContext } from 'react';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherIcons';
import { WeatherContext } from '../App';

const WeatherCard = memo(({ city, onDelete, index }) => {
  const { 
    temperatureUnit, 
    convertTemp, 
    comparisonMode,
    selectedForComparison,
    toggleCityComparison 
  } = useContext(WeatherContext);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  const isSelectedForComparison = selectedForComparison.includes(city._id);

  // Set staggered animation delay based on card index
  useEffect(() => {
    setAnimationDelay(index * 0.1);
  }, [index]);

  // Memoized temperature color calculation
  const temperatureColor = useMemo(() => {
    const temp = parseFloat(city.temperature);
    if (temp <= 0) return { glow: 'rgba(58, 134, 255, 0.4)', border: '#3a86ff' };
    if (temp <= 15) return { glow: 'rgba(6, 255, 165, 0.4)', border: '#06ffa5' };
    if (temp <= 25) return { glow: 'rgba(255, 190, 11, 0.4)', border: '#ffbe0b' };
    if (temp <= 35) return { glow: 'rgba(255, 107, 53, 0.4)', border: '#ff6b35' };
    return { glow: 'rgba(255, 0, 110, 0.4)', border: '#ff006e' };
  }, [city.temperature]);

  // Memoized condition emoji
  const conditionEmoji = useMemo(() => {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️',
    };
    return emojiMap[city.condition] || '🌤️';
  }, [city.condition]);

  // Handle delete with callback (no confirmation)
  const handleDelete = useCallback(() => {
    onDelete(city._id, city.cityName);
  }, [city._id, city.cityName, onDelete]);

  // Toggle flip animation
  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  // Handle comparison toggle
  const handleComparisonToggle = useCallback((e) => {
    e.stopPropagation();
    toggleCityComparison(city._id);
  }, [city._id, toggleCityComparison]);

  // Check for weather alerts
  const hasAlert = useMemo(() => {
    const temp = parseFloat(city.temperature);
    const wind = parseFloat(city.windSpeed);
    return temp > 35 || temp < 0 || wind > 50 || city.condition === 'Thunderstorm';
  }, [city.temperature, city.windSpeed, city.condition]);

  // Error state
  if (city.error) {
    return (
      <div 
        className="weather-card-modern error-card-modern"
        style={{ animationDelay: `${animationDelay}s` }}
      >
        <button className="delete-btn-modern" onClick={handleDelete}>✕</button>
        <div className="card-error-modern">
          <span className="error-icon-modern">⚠️</span>
          <h3>{city.cityName}</h3>
          <p>{city.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`weather-card-modern ${isHovered ? 'card-hovered-modern' : ''} ${isFlipped ? 'card-flipped' : ''}`}
      style={{ 
        animationDelay: `${animationDelay}s`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px ${temperatureColor.glow}`,
        borderColor: temperatureColor.border
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Delete button */}
      <button 
        className="delete-btn-modern"
        onClick={handleDelete}
        aria-label="Remove city"
      >
        ✕
      </button>

      {/* Comparison button (only in comparison mode) */}
      {comparisonMode && (
        <button 
          className={`compare-btn ${isSelectedForComparison ? 'active' : ''}`}
          onClick={handleComparisonToggle}
          aria-label={isSelectedForComparison ? "Remove from comparison" : "Add to comparison"}
        >
          {isSelectedForComparison ? '✓' : '⚖️'}
        </button>
      )}

      {/* Weather Alert Badge */}
      {hasAlert && (
        <div className="alert-badge" title="Weather Alert!">
          ⚠️
        </div>
      )}

      {/* Info/Flip Button */}
      <button 
        className="info-btn-modern"
        onClick={handleFlip}
        aria-label={isFlipped ? "Show main info" : "Show detailed info"}
        title={isFlipped ? "Back to main" : "View details"}
      >
        <span className="info-icon">{isFlipped ? '←' : 'ℹ'}</span>
      </button>

      {/* Card Inner Container for flip effect */}
      <div className="card-inner-modern">
        {/* Front Side */}
        <div className="card-front-modern">
          {/* Left Side - Temperature Display */}
          <div className="card-left-section">
            <div className="location-badge-modern">
              <span className="location-icon-modern">📍</span>
              <div>
                <h2 className="city-name-modern">{city.cityName}</h2>
                {city.country && <span className="country-flag-modern">{city.country}</span>}
              </div>
            </div>
            
            <div className="temp-display-large">
              <div className="temp-value-large">{convertTemp(city.temperature)}</div>
              <div className="temp-unit-large">&deg;{temperatureUnit}</div>
            </div>
            
            <div className="condition-display-modern">
              <span className="condition-emoji-modern">{conditionEmoji}</span>
              <div className="condition-text-modern">
                <span className="condition-name-modern">{city.condition}</span>
                <span className="condition-desc-modern">{city.description}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Weather Stats */}
          <div className="card-right-section">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-icon-modern">🌡️</span>
                <div className="stat-content">
                  <span className="stat-label-modern">Feels Like</span>
                  <span className="stat-value-modern">{city.feelsLike}°C</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-icon-modern">💧</span>
                <div className="stat-content">
                  <span className="stat-label-modern">Humidity</span>
                  <span className="stat-value-modern">{city.humidity}%</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-icon-modern">💨</span>
                <div className="stat-content">
                  <span className="stat-label-modern">Wind Speed</span>
                  <span className="stat-value-modern">{city.windSpeed} m/s</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-icon-modern">🎚️</span>
                <div className="stat-content">
                  <span className="stat-label-modern">Pressure</span>
                  <span className="stat-value-modern">{city.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side - Detailed Information */}
        <div className="card-back-modern">
          <div className="back-header-modern">
            <h3 className="back-title-modern">📊 Detailed Information</h3>
            <p className="back-subtitle-modern">{city.cityName}</p>
          </div>
          
          <div className="details-grid-modern">
            <div className="detail-item-modern">
              <span className="detail-icon-modern">🌡️</span>
              <div className="detail-content-modern">
                <span className="detail-label-modern">High Temperature</span>
                <span className="detail-value-modern">{convertTemp(city.tempMax)}&deg;{temperatureUnit}</span>
              </div>
            </div>

            <div className="detail-item-modern">
              <span className="detail-icon-modern">❄️</span>
              <div className="detail-content-modern">
                <span className="detail-label-modern">Low Temperature</span>
                <span className="detail-value-modern">{convertTemp(city.tempMin)}&deg;{temperatureUnit}</span>
              </div>
            </div>

            <div className="detail-item-modern">
              <span className="detail-icon-modern">🎚️</span>
              <div className="detail-content-modern">
                <span className="detail-label-modern">Pressure</span>
                <span className="detail-value-modern">{city.pressure} hPa</span>
              </div>
            </div>

            <div className="detail-item-modern">
              <span className="detail-icon-modern">💧</span>
              <div className="detail-content-modern">
                <span className="detail-label-modern">Humidity</span>
                <span className="detail-value-modern">{city.humidity}%</span>
              </div>
            </div>

            <div className="detail-item-modern">
              <span className="detail-icon-modern">💨</span>
              <div className="detail-content-modern">
                <span className="detail-label-modern">Wind Speed</span>
                <span className="detail-value-modern">{city.windSpeed} m/s</span>
              </div>
            </div>

            <div className="detail-item-modern">
              <span className="detail-icon-modern">🌡️</span>
              <div className="detail-content-modern">
                <span className="detail-label-modern">Feels Like</span>
                <span className="detail-value-modern">{convertTemp(city.feelsLike)}&deg;{temperatureUnit}</span>
              </div>
            </div>
          </div>

          <div className="back-footer-modern">
            <span className="back-hint-modern">Click ℹ to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
});

WeatherCard.displayName = 'WeatherCard';

export default WeatherCard;
