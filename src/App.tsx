// Path: src/App.tsx
import React, { Suspense, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Helmet } from 'react-helmet';

import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';

import IMG from "./assets/image/cover.png";
import clsx from 'clsx';

const Projects = React.lazy(() => import('./components/Projects'));
const ContactUs = React.lazy(() => import('./components/ContactUs'));

const SITE_URL = "https://amirrahemi.com";

const SEO_CONTENT = {
  en: {
    title: "Amir Rahemi - Full-Stack Developer | React & Next.js",
    description: "Amir Rahemi is a passionate full-stack developer specializing in modern JavaScript, React, Next.js, Node.js, and TypeScript. Browse my portfolio projects and get in touch.",
    keywords: "Amir Rahemi, full-stack developer, web developer, React developer, Next.js, JavaScript, Node.js, portfolio, frontend developer, backend developer",
    ogDescription: "Portfolio of Amir Rahemi - Skilled full-stack developer specializing in React, Next.js, and modern web technologies. View my projects and experience.",
    schemaDescription: "Full-Stack Developer specializing in React, Next.js, and modern web technologies",
  },
  fa: {
    title: "امیر راحمی - توسعه‌دهنده فول‌استک | React و Next.js",
    description: "امیر راحمی یک توسعه‌دهنده فول‌استک با تخصص در جاوااسکریپت مدرن، React، Next.js، Node.js و TypeScript است. نمونه‌کارهای من را ببینید و در تماس باشید.",
    keywords: "امیر راحمی, توسعه دهنده فول استک, برنامه نویس وب, توسعه دهنده React, Next.js, جاوااسکریپت, Node.js, نمونه کار",
    ogDescription: "نمونه‌کار امیر راحمی - توسعه‌دهنده فول‌استک با تخصص در React، Next.js و فناوری‌های وب مدرن.",
    schemaDescription: "توسعه‌دهنده فول‌استک با تخصص در React، Next.js و فناوری‌های وب مدرن",
  },
} as const;

function App() {
  const [t, i18n] = useTranslation("global");
  const location = useLocation();

  // URL is the source of truth for language: "/" = English, "/fa" = Persian.
  // This lets Google crawl and index each language as a distinct, canonical page.
  const currentLang = (location.pathname.startsWith('/fa') ? 'fa' : 'en') as 'en' | 'fa';

  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
    localStorage.setItem("language", currentLang);
  }, [currentLang, i18n]);

  // On Scroll Hide Content
  const [isVisible, setIsVisible] = useState(true);

  const listenToScroll = useCallback(() => {
    const heightToHideFrom = 15;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      setIsVisible((prev) => (prev ? false : prev));
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    }
  }, [listenToScroll]);

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

  const seo = SEO_CONTENT[currentLang];
  const canonicalUrl = currentLang === 'fa' ? `${SITE_URL}/fa` : SITE_URL;

  return (
    <div className="bg-[white] dark:bg-black h-screen text-white font-paytone rtl:font-lalezar font-medium transition-all capitalize">
      <Helmet>
        {/* HTML attributes */}
        <html lang={currentLang} dir={currentLang === 'fa' ? 'rtl' : 'ltr'} />

        {/* Basic Meta Tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="author" content="Amir Rahemi" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="g_1thjCsV9Zsk6mFnfvHTwtioi2tn7J4Zz_4ufHwNrg" />

        {/* Canonical URL (self-referencing per language) */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Hreflang alternates - tells Google these are language variants of the same page */}
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="fa" href={`${SITE_URL}/fa`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Amir Rahemi Portfolio" />
        <meta property="og:locale" content={currentLang === 'fa' ? 'fa_IR' : 'en_US'} />
        <meta property="og:locale:alternate" content={currentLang === 'fa' ? 'en_US' : 'fa_IR'} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@madeby_amir" />
        <meta name="twitter:creator" content="@madeby_amir" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.png`} />
        <meta name="twitter:image:alt" content={seo.title} />

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
            "alternateName": "امیر راحمی",
            "jobTitle": "Full-Stack Developer",
            "url": canonicalUrl,
            "sameAs": [
              "https://github.com/amirrahemi01",
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
            "description": seo.schemaDescription,
            "image": `${SITE_URL}/logo.png`,
            "inLanguage": currentLang === 'fa' ? 'fa-IR' : 'en-US'
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex flex-col justify-center w-full lg:w-3/4 my-0 mx-auto">
      <section className="h-0 sm:h-[2vh]"></section>
        <section className="relative h-screen sm:h-[96vh] w-full max-w-none flex items-center justify-center flex-col bg-black dark:bg-white rounded-none sm:rounded-2xl overflow-hidden">
          <div className="absolute top-20 md:top-40 lg:top-8 px-4 py-3 w-full sm:w-auto text-center sm:text-left">
            <h2 className={clsx("text-7xl sm:text-3xl md:text-5xl lg:text-8xl text-white dark:text-black leading-tight", currentLang === "fa" ? "text-right" : "text-left")}>{t("header.hello")}</h2>
            <p className={clsx("text-base sm:text-base md:text-2xl lg:text-3xl text-white dark:text-black mt-2 sm:mt-3", currentLang === "fa" ? "text-right" : "text-left")}>
              {t("header.Welcome to my slice of the internet")}
            </p>
          </div>

          <a
            id={isVisible ? "hide" : "nohide"}
            className="mouse-scroll z-50"
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            aria-label={t("navbar.about") || "Scroll to About section"}
          >
            <span className="sr-only">{t("navbar.about") || "Scroll to About section"}</span>
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-2 sm:right-3 lg:right-10 bottom-12 sm:bottom-14 z-50 text-white dark:text-black rounded-full p-3 sm:p-4 text-xl sm:text-2xl bg-blue-200 dark:bg-blue-100 hover:bg-blue-300 dark:hover:bg-blue-200 transition-colors shadow-lg"
            id={isVisible ? "nohide" : "hide"}
            aria-label="Scroll to top"
          >
            <MdKeyboardDoubleArrowUp />
          </button>

          <img
            className="absolute w-5/6 xs:w-3/5 sm:w-80 md:w-2/5  lg:w-2/6 max-w-2xl bottom-0 object-contain object-bottom transition-all duration-300"
            alt="Amir Rahemi - Full-Stack Developer"
            loading="eager"
            fetchPriority="high"
            src={IMG || "/placeholder.svg"}
          />
        </section>

        <section className="h-[2vh]"></section>

        <section className="h-auto flex items-center justify-center flex-col text-white">

          <About />

        </section>

        <section className="h-auto flex items-center justify-center flex-col text-white">

          <Suspense fallback={null}>
            <Projects />
          </Suspense>

        </section>

        <section className="h-auto flex items-center justify-center flex-col text-white">

          <Suspense fallback={null}>
            <ContactUs />
          </Suspense>

        </section>
      </main>

      <Footer />

      <SpeedInsights />

    </div>
  );
}

export default App;