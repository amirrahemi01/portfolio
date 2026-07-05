import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from './App';

import translation_en from "./assets/locale/en/translation.json"
import translation_fa from "./assets/locale/fa/translation.json"

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

// URL is the source of truth for language ("/" = en, "/fa" = fa).
// Resolving this synchronously (before init/first render) avoids a
// flash of the wrong language while i18next would otherwise start at
// its default and only correct itself after mount.
const initialLang = window.location.pathname.startsWith('/fa') ? 'fa' : 'en';

// Set html lang/dir immediately too, before React/Helmet has a chance to run,
// so there's no flash of ltr layout on the Persian route either.
document.documentElement.lang = initialLang;
document.documentElement.dir = initialLang === 'fa' ? 'rtl' : 'ltr';

i18next.init({
  interpolation: { escapeValue: false },
  lng: initialLang,
  resources: {
    en: {
      global: translation_en,
    },
    fa: {
      global: translation_fa,
    },
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);