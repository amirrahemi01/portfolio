import React, { useEffect, useRef, useState, useTransition } from 'react';
import './App.css';

import sideview from "./assets/image/sideview.webp"
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
import Navbar from './components/Navbar';
import Typewriter from 'typewriter-effect';

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";

import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import Footer from './components/Footer';

import IMG from "./assets/image/cover.jpg"
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ContactUs from './components/ContactUs';


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
    <div className="bg-white dark:bg-black h-screen text-white font-paytone rtl:font-lalezar font-normal transition-all capitalize">
      <Navbar />

      <div className="vanta-cloud-animation"></div>

      <div className="flex flex-col justify-center w-full lg:w-3/4 my-0 mx-auto">
        <section className="[height:96vh] flex items-center justify-center flex-col w-full bg-black rounded-2xl m-4 dark:bg-black dark:m-0 dark:h-screen dark:rounded-none;">
          <div className="absolute bottom-20 z-40 p-3">
          <h2 className="text-2xl md:text-5xl lg:text-8xl">{t("header.hello")}</h2>
          <p className="text-sm md:text-3xl lg:text-5xl">{t("header.Welcome to my slice of the internet")}</p>
          </div>

          <a id={isVisible ? "hide" : "nohide"} className="mouse-scroll z-50" href="#about"></a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-10 bottom-14 z-50 text-white dark:text-black rounded-full p-4 text-2xl bg-blue-200 dark:bg-blue-100"
            id={isVisible ? "nohide" : "hide"}
          >
            <MdKeyboardDoubleArrowUp />
          </button>
          
          <img className="absolute bottom-auto w-80 md:w-72 lg:w-64 lg:[bottom: 4vh]" src={IMG} alt="" />
        </section>

        <section className="h-auto flex items-center justify-center flex-col text-white" id="a">

          <About />

        </section>

        <section className="h-auto flex items-center justify-center flex-col text-white" id="a">

          <Projects />

        </section>

        <section className="h-screen flex items-center justify-center flex-col text-white" id="a">

          
          <ContactUs />

        </section>

        <section className="a">
        {/* <h3>{t("header.cancel")}</h3>
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
            className="fixed right-10 bottom-14 z-50 bg-blue-100 text-black rounded-lg p-4 text-2xl"
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
          /> */}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;