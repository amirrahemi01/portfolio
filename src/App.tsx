// Path: src/App.tsx
import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Helmet } from 'react-helmet';

import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

import IMG from "./assets/image/cover.png";

function App() {
  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };


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

  // Smooth scroll to section without changing URL
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const currentLang = (i18n.language || 'en') as 'en' | 'fa';
  console.log(currentLang);
  const isRTL = currentLang === 'fa';


  return (
    <div className="bg-[white] dark:bg-black h-screen text-white font-paytone rtl:font-lalezar font-medium transition-all capitalize">
      <Helmet>
        {/* HTML attributes */}
        <html lang="en" dir="ltr" />

        {/* Basic Meta Tags */}
        <title>Amir Rahemi - Full-Stack Developer | React & Next.js</title>
        <meta name="description" content="Amir Rahemi is a passionate full-stack developer specializing in modern JavaScript, React, Next.js, Node.js, and TypeScript. Browse my portfolio projects and get in touch." />
        <meta name="keywords" content="Amir Rahemi, full-stack developer, web developer, React developer, Next.js, JavaScript, Node.js, portfolio, frontend developer, backend developer" />
        <meta name="author" content="Amir Rahemi" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="g_1thjCsV9Zsk6mFnfvHTwtioi2tn7J4Zz_4ufHwNrg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://amirrahemi.com" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Amir Rahemi - Full-Stack Developer | React & Next.js" />
        <meta property="og:description" content="Portfolio of Amir Rahemi - Skilled full-stack developer specializing in React, Next.js, and modern web technologies. View my projects and experience." />
        <meta property="og:image" content="https://amirrahemi.com/logo.png" />
        <meta property="og:url" content="https://amirrahemi.com" />
        <meta property="og:site_name" content="Amir Rahemi Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@madeby_amir" />
        <meta name="twitter:creator" content="@madeby_amir" />
        <meta name="twitter:title" content="Amir Rahemi - Full-Stack Developer" />
        <meta name="twitter:description" content="Portfolio of Amir Rahemi - Skilled full-stack developer specializing in React, Next.js, and modern web technologies." />
        <meta name="twitter:image" content="https://amirrahemi.com/logo.png" />
        <meta name="twitter:image:alt" content="Amir Rahemi - Full-Stack Developer" />

        {/* Additional Important Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />

        {/* Schema.org structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Amir Rahemi",
            "jobTitle": "Full-Stack Developer",
            "url": "https://amirrahemi.com",
            "sameAs": [
              "https://github.com/amirrahemi",
              "https://linkedin.com/in/amirrahemi",
              "https://twitter.com/madeby_amir"
            ],
            "knowsAbout": [
              "JavaScript",
              "React",
              "Next.js",
              "Node.js",
              "TypeScript",
              "Full-Stack Development"
            ],
            "description": "Full-Stack Developer specializing in React, Next.js, and modern web technologies",
            "image": "https://amirrahemi.com/logo.png",
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>

      <Navbar />

      <div className="flex flex-col justify-center w-full lg:w-3/4 my-0 mx-auto">
        <section className="[height:96vh] flex items-center justify-center flex-col [width: 90%] lg:w-full bg-black rounded-2xl dark:bg-white m-4 h-screen rounded-none;">
          <div className="absolute bottom-20 z-40 p-3">
            <h2 className="text-2xl md:text-5xl lg:text-8xl text-white dark:text-black">{t("header.hello")}</h2>
            <p className="text-sm md:text-3xl lg:text-5xl text-white dark:text-black">{t("header.Welcome to my slice of the internet")}</p>
          </div>

          <a 
            id={isVisible ? "hide" : "nohide"} 
            className="mouse-scroll z-50" 
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
          ></a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-3 lg:right-10 bottom-14 z-50 text-white dark:text-black rounded-full p-4 text-2xl bg-blue-200 dark:bg-blue-100 hover:bg-blue-300 dark:hover:bg-blue-200 transition-colors shadow-lg"
            id={isVisible ? "nohide" : "hide"}
            aria-label="Scroll to top"
          >
            <MdKeyboardDoubleArrowUp />
          </button>

          <img 
            className="absolute w-96 md:w-72 lg:w-3/5 max-w-xl bottom-5 lg:bottom-5 xl:bottom-8 object-contain object-bottom" 
            src={IMG} 
            alt="Amir Rahemi - Full-Stack Developer" 
          />
        </section>

        <section className="h-auto flex items-center justify-center flex-col text-white">

          <About />

        </section>

        <section className="h-auto flex items-center justify-center flex-col text-white">

          <Projects />

        </section>

        <section className="h-auto flex items-center justify-center flex-col text-white">

          <ContactUs />

        </section>
      </div>

      <Footer />

      <SpeedInsights />

    </div>
  );
}

export default App;