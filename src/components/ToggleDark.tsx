import React, { useEffect } from 'react';
import { FaMoon } from 'react-icons/fa6';

function ToggleDark() {
  useEffect(() => {
    const selectedTheme = localStorage.getItem('selectedThemeType');
    if (selectedTheme === 'dark') {
      setDarkMode();
    }
  }, []);

  function setDarkMode() {
    document.documentElement.className = 'dark';
    localStorage.setItem('selectedThemeType', 'dark');
  }

  function setLightMode() {
    document.documentElement.className = 'light';
    localStorage.setItem('selectedThemeType', 'light');
  }

  const selectedTheme = localStorage.getItem('selectedThemeType');

  if (!selectedTheme) {
    setDarkMode();
  }

  function toggleTheme(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  }

  return (
    <>
      <input
        onChange={toggleTheme}
        defaultChecked={selectedTheme === 'dark'}
        className="theme-switch"
        type="checkbox"
        id="switch"
      />
      <label className="theme-switch" htmlFor="switch">
      <button><FaMoon /></button>
      </label>
    </>
  );
}

export default ToggleDark;
