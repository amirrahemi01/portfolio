import React, { useEffect, useRef, useState, useTransition } from 'react';
import './App.css';

import sideview from "./assets/image/sideview.webp"
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
import Navbar from './components/Navbar';


function App() {
  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="bg-black h-screen text-white">
      <Navbar />
      <div className="vanta-cloud-animation"></div>
      <div className="flex justify-center">
      <a href="#" className="mousescroll bg-red-100"></a>
        <h3>{t("header.cancel")}</h3>
        <button onClick={() => handleChangeLanguage("en")}>EN</button>
        <button onClick={() => handleChangeLanguage("fa")}>FA</button>
        <img src={sideview} width={"200px"} />
      </div>
    </div>
  );
}

export default App;