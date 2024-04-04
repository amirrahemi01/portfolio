import React, { useEffect, useRef, useState, useTransition } from 'react';
import './App.css';

import sideview from "./assets/image/sideview.webp"
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
import Navbar from './components/Navbar';

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";


function App() {
  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    <div className="bg-white dark:bg-black h-screen text-white">
      <Navbar />
      <div className="vanta-cloud-animation"></div>
      <div className="flex flex-col justify-center">
        <a href="#" className="mousescroll bg-red-100"></a>
        <h3>{t("header.cancel")}</h3>
        <button onClick={() => handleChangeLanguage("en")}>EN</button>
        <button onClick={() => handleChangeLanguage("fa")}>FA</button>
        <img src={sideview} width={"200px"} />
        <button className="bg-green-100 p-7" onClick={() => handleChangeLanguage(localStorage.getItem("language") === "fa" ? 'en' : 'fa')}>
          {localStorage.getItem("language") === "fa" ? 'en' : 'fa'}
        </button>
      </div>
    </div>
  );
}

export default App;