// Path: src/components/ToggleDark.tsx

import React, { useEffect, useState } from 'react';

import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";

function ToggleDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const selectedTheme = localStorage.getItem('selectedThemeType');
    if (selectedTheme === 'dark') {
      setDarkMode();
      setIsDark(true);
    } else {
      setLightMode();
      setIsDark(false);
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
      setIsDark(false);
    } else {
      setDarkMode();
      setIsDark(true);
    }
  }

  return (
      <button
        onClick={toggleTheme}
        className="text-gray-100"
        aria-label="Toggle dark mode"
      >
        <Expand 
          className="transition-none" 
          duration={750} 
          reversed={isDark}
          toggled={isDark}
          onPointerEnterCapture={undefined}
          placeholder={<div>Loading...</div>}
          onPointerLeaveCapture={undefined}
        />
      </button>
  );
}

export default ToggleDark;