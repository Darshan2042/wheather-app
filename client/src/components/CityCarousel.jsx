/**
 * CityCarousel Component
 * Horizontal scrollable container for weather cards
 */

import React, { useRef } from 'react';
import WeatherCard from './WeatherCard';

const CityCarousel = ({ cities, onDeleteCity, onRefresh }) => {
  const carouselRef = useRef(null);

  /**
   * Handle scroll left
   */
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Handle scroll right
   */
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="carousel-container">
      {/* Carousel header */}
      <div className="carousel-header">
        <div className="carousel-title">
          <h2>Your Cities</h2>
          <span className="city-count">{cities.length} {cities.length === 1 ? 'city' : 'cities'}</span>
        </div>
        <button 
          className="refresh-button"
          onClick={onRefresh}
          title="Refresh weather data"
        >
          <span className="refresh-icon">🔄</span>
          Refresh
        </button>
      </div>

      {/* Carousel with scroll buttons */}
      <div className="carousel-wrapper">
        {/* Left scroll button */}
        {cities.length > 1 && (
          <button 
            className="scroll-button scroll-left"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        {/* Scrollable card container */}
        <div className="carousel" ref={carouselRef}>
          {cities.map((city) => (
            <WeatherCard 
              key={city._id} 
              city={city}
              onDelete={onDeleteCity}
            />
          ))}
        </div>

        {/* Right scroll button */}
        {cities.length > 1 && (
          <button 
            className="scroll-button scroll-right"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>

      {/* Scroll hint */}
      {cities.length > 2 && (
        <div className="scroll-hint">
          <span className="hint-icon">👆</span>
          Scroll or use arrow buttons to see more cities
        </div>
      )}
    </div>
  );
};

export default CityCarousel;
