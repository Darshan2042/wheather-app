/**
 * SearchBar Component
 * Allows users to search and add new cities
 */

import React, { useState } from 'react';

const SearchBar = ({ onAddCity, loading }) => {
  const [cityInput, setCityInput] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!cityInput.trim()) {
      setMessage('Please enter a city name');
      return;
    }

    // Clear any previous messages
    setMessage('');

    // Call parent function to add city
    const result = await onAddCity(cityInput.trim());
    
    if (result.success) {
      setCityInput('');
      setMessage(result.message);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      setMessage(result.message);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    setCityInput(e.target.value);
    if (message) setMessage(''); // Clear message when typing
  };

  /**
   * Handle input key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city (e.g., London, Paris, Tokyo)..."
            value={cityInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          {cityInput && (
            <button
              type="button"
              className="clear-button"
              onClick={() => setCityInput('')}
              disabled={loading}
            >
              ✕
            </button>
          )}
        </div>
        
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !cityInput.trim()}
        >
          {loading ? (
            <span className="button-spinner"></span>
          ) : (
            <>
              <span className="button-icon">➕</span>
              <span className="button-text">Add City</span>
            </>
          )}
        </button>
      </form>

      {/* Message display */}
      {message && (
        <div className={`search-message ${message.includes('Failed') || message.includes('not found') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
