import React from 'react';
import './index.css';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className={`app-header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className='heading'>Weather App</h1>
      <div className="toggle-container">
        <span className='span-element'>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </header>
  );
};

export default Header;
