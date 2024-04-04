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
    let heightToHideFrom = 200;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div className="bg-white dark:bg-black h-screen text-white">
      <Navbar />

      <div className="vanta-cloud-animation"></div>

      <div className="flex flex-col justify-center w-3/4 my-0 mx-auto">
        <section className="starter">

       <div id={isVisible ? "hide" : "nohide"}>
            Content hidden when scrolled beyond  200px
       </div>

        </section>
        <h2>Hello</h2>
        <p>Welcome to my slice of the internet</p>
        
        <a className="_scrollIndicator_x8c4c_232" data-status="entered" data-hidden="false" href="/#project-1"><span className="_hidden_1mhmf_2" data-hidden="true">Scroll to projects</span></a>
        <h3>{t("header.cancel")}</h3>
        <button onClick={() => handleChangeLanguage("en")}>EN</button>
        <button onClick={() => handleChangeLanguage("fa")}>FA</button>
        <img src={sideview} width={"200px"} />
        <button className="bg-green-100 p-7" onClick={() => handleChangeLanguage(localStorage.getItem("language") === "fa" ? 'en' : 'fa')}>
          {localStorage.getItem("language") === "fa" ? 'en' : 'fa'}
        </button>
        {localStorage.getItem("selectedThemeType") === "dark" ? "dark" : "light"}
      </div>
    </div>
  );
}

export default App;