// WeeklyForecast.js

import React from 'react';
import moment from 'moment';
import './index.css';

const WeeklyForecast = ({ forecastData, isDarkMode }) => {
  return (
    <div className={`weekly-forecast ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>7-Day Forecast</h2>
      <div className="forecast-grid">
        {forecastData.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{moment(forecast.dt * 1000).format('dddd')}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
            />
            <p>{`${forecast.main.temp} °C`}</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
