// src/components/Forecast.js
import React from 'react';
import './index.css';

const Forecast = ({ forecastData, isDarkMode }) => {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className={`forecast-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {forecastData.map((day, index) => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        return (
          <div key={index} className="forecast-item">
            <p>{date}</p>
            <img src={iconUrl} alt={day.weather[0].description} />
            <p>{`Temp: ${day.main.temp} °C`}</p>
            <p>{`Humidity: ${day.main.humidity} %`}</p>
            <p>{day.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
