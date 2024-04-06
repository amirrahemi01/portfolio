import React, { useEffect, useRef, useState, useTransition } from 'react';
import './App.css';

import sideview from "./assets/image/sideview.webp"
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
import Navbar from './components/Navbar';
import Typewriter from 'typewriter-effect';

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";

import { MdKeyboardDoubleArrowUp } from "react-icons/md";

function App() {
  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  // On Scroll Hide Content
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    }
  }, []);

  function listenToScroll() {
    let heightToHideFrom = 15;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div className="bg-white dark:bg-black h-screen text-white font-paytone rtl:font-lalezar font-normal transition-all">
      <Navbar />

      <div className="vanta-cloud-animation"></div>

      <div className="flex flex-col justify-center w-3/4 my-0 mx-auto">
        <section className="h-screen flex items-center justify-center flex-col">
          <h2 style={{ fontSize: "85px" }}>{t("header.hello")}</h2>
          <p style={{ fontSize: "45px" }}>{t("header.Welcome to my slice of the internet")}</p>

          <a id={isVisible ? "hide" : "nohide"} className="mouse-scroll" href="#a"></a>
        </section>

        <section className="h-screen flex items-center justify-center flex-col text-slate-400">

          <h3>{t("header.cancel")}</h3>
          <button onClick={() => handleChangeLanguage("en")}>EN</button>
          <button onClick={() => handleChangeLanguage("fa")}>FA</button>
          <img src={sideview} width={"200px"} />
          <button className="bg-green-100 p-7" onClick={() => handleChangeLanguage(localStorage.getItem("language") === "fa" ? 'en' : 'fa')}>
            {localStorage.getItem("language") === "fa" ? 'en' : 'fa'}
          </button>
          <p className="text-red-200 rtl:text-green-100">{t("header.hello")}</p>
          {localStorage.getItem("selectedThemeType") === "dark" ? "dark" : "light"}

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-7 bottom-7 z-50 bg-gray-600 rounded-lg p-4 text-2xl"
            id={isVisible ? "nohide" : "hide"}
          >
            <MdKeyboardDoubleArrowUp />
          </button>

          <Typewriter
  options={{
    strings: ['Hello', 'World'],
    autoStart: true,
    loop: true,
    delay: 100,
  }}
          />

          <pre>


          </pre>
        </section>
      </div>
    </div>
  );
}

export default App;