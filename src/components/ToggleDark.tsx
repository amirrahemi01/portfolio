import React, { useEffect } from 'react';

import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";

function ToggleDark() {
  useEffect(() => {
    const selectedTheme = localStorage.getItem('selectedThemeType');
    if (selectedTheme === 'dark') {
      setDarkMode();
    }
  }, []);

  function setDarkMode() {
    document.body.setAttribute('data-mode', 'dark');
    localStorage.setItem('selectedThemeType', 'dark');
  }

  function setLightMode() {
    document.body.setAttribute('data-mode', 'light');
    localStorage.setItem('selectedThemeType', 'light');
  }

  const selectedTheme = localStorage.getItem('selectedThemeType');

  if (!selectedTheme) {
    setDarkMode();
  }

  function toggleTheme(e: React.MouseEvent<HTMLButtonElement>) {
    const currentTheme = localStorage.getItem('selectedThemeType');
    if (currentTheme === 'dark') {
      setLightMode();
    } else {
      setDarkMode();
    }
  }

  return (
      <button
        onClick={toggleTheme}
        defaultChecked={selectedTheme === 'dark'}
        className="text-gray-100 dark:text-white"
      >
        <Expand className="transition-none " duration={750} reversed placeholder={<div>Loading...</div>} />
      </button>
  );
}

export default ToggleDark;
