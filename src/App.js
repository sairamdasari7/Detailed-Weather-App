// App.js

import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import WeeklyForecast from './components/WeeklyForecast';
import InputError from './components/InputError';
import './App.css';

class App extends Component {
  state = {
    weatherData: null,
    forecastData: [],
    error: '',
    isDarkMode: false,
  };

  fetchWeatherData = async (location) => {
    const API_KEY = '0525994b0f1e8ca8ff20af00ab5722a4'; 
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

    try {
      // Fetch current weather data
      const weatherResponse = await axios.get(`${BASE_URL}weather`, {
        params: {
          q: location,
          units: 'metric',
          appid: API_KEY,
        },
      });

      console.log('Weather Response:', weatherResponse.data);

      // Fetch forecast data
      const forecastResponse = await axios.get(`${BASE_URL}forecast`, {
        params: {
          q: location,
          units: 'metric',
          appid: API_KEY,
        },
      });

      console.log('Forecast Response:', forecastResponse.data);

      // Process the forecast data to get daily forecasts
      const dailyForecasts = this.processForecastData(forecastResponse.data.list);

      this.setState({
        weatherData: weatherResponse.data,
        forecastData: dailyForecasts,
        error: '',
      });
    } catch (err) {
      console.error('API Error:', err);
      this.setState({ error: 'Unable to fetch weather data. Please try again.', weatherData: null });
    }
  };

  processForecastData = (forecastList) => {
    const dailyForecasts = [];
    const daysProcessed = new Set();

    forecastList.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (!daysProcessed.has(day)) {
        dailyForecasts.push(forecast);
        daysProcessed.add(day);
      }

      if (dailyForecasts.length === 7) {
        return dailyForecasts;
      }
    });

    return dailyForecasts;
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ isDarkMode: !prevState.isDarkMode }));
  };

  render() {
    const { weatherData, forecastData, error, isDarkMode } = this.state;

    return (
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header toggleDarkMode={this.toggleDarkMode} isDarkMode={isDarkMode} />
        <Search locationSearch={this.fetchWeatherData} />
        {error && <InputError message={error} />}
        <div className="weather-container">
          <WeatherDisplay weatherData={weatherData} isDarkMode={isDarkMode} />
          <WeeklyForecast forecastData={forecastData} isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }
}

export default App;
