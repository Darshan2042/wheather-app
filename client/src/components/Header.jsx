/**
 * Header Component
 * Displays live date and time at the top of the application
 */

import React, { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  /**
   * Format date string
   */
  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentTime.toLocaleDateString('en-US', options);
  };

  /**
   * Format time string
   */
  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1 className="app-title">
            <span className="title-icon">☁️</span>
            Weather Dashboard
          </h1>
          <p className="app-subtitle">Real-time weather information at your fingertips</p>
        </div>
        
        <div className="header-datetime">
          <div className="date-display">
            <span className="date-icon">📅</span>
            <span className="date-text">{formatDate()}</span>
          </div>
          <div className="time-display">
            <span className="time-icon">🕐</span>
            <span className="time-text">{formatTime()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
