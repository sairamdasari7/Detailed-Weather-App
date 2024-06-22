import React from 'react';
import './index.css';

const WeatherDisplay = ({ weatherData, isDarkMode }) => {
  if (!weatherData) return null;

  const { name, main, weather, wind, dt } = weatherData;
  const date = new Date(dt * 1000).toLocaleDateString();
  const time = new Date(dt * 1000).toLocaleTimeString();
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className={`weather-display ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p>{`Temperature: ${main.temp} °C`}</p>
      <p>{`Humidity: ${main.humidity} %`}</p>
      <p>{`Wind Speed: ${wind.speed} m/s`}</p>
      <p>{`Description: ${weather[0].description}`}</p>
      <p>{`Date: ${date}`}</p>
      <p>{`Time: ${time}`}</p>
    </div>
  );
};

export default WeatherDisplay;
