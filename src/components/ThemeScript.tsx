"use client";

/**
 * Sets the theme on <html> before first paint (saved choice, else the system setting).
 *
 * It only renders on the server. React 19 logs "Encountered a script tag while rendering React
 * component" whenever the *client* creates a <script>, which happens each time the language switch
 * remounts the root layout. The server-rendered tag is the one that matters (it runs before paint);
 * on the client the page already has its theme, and ToggleDark re-applies it after navigation.
 */
const themeScript = `(function(){try{var s=localStorage.getItem('selectedThemeType');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-mode',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-mode','dark');}})();`;

export default function ThemeScript() {
  if (typeof window !== "undefined") return null;
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
