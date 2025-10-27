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

import IMG from "./assets/image/cover.jpg";

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

  // SEO Content based on language
  const seoContent: {
    en: {
      title: string;
      description: string;
      keywords: string;
      ogTitle: string;
      ogDescription: string;
      twitterTitle: string;
      twitterDescription: string;
      siteName: string;
      jobTitle: string;
      descriptionSchema: string;
    };
    fa: {
      title: string;
      description: string;
      keywords: string;
      ogTitle: string;
      ogDescription: string;
      twitterTitle: string;
      twitterDescription: string;
      siteName: string;
      jobTitle: string;
      descriptionSchema: string;
    };
  } = {
    en: {
      title: "Amir Rahemi - Full-Stack Developer | React & Next.js Expert",
      description: "Amir Rahemi is a passionate full-stack developer specializing in modern JavaScript, React, Next.js, Node.js, and TypeScript. Browse my portfolio projects and get in touch.",
      keywords: "Amir Rahemi, full-stack developer, web developer, React developer, Next.js, JavaScript, Node.js, portfolio, frontend developer, backend developer",
      ogTitle: "Amir Rahemi - Full-Stack Developer | React & Next.js",
      ogDescription: "Portfolio of Amir Rahemi - Skilled full-stack developer specializing in React, Next.js, and modern web technologies. View my projects and experience.",
      twitterTitle: "Amir Rahemi - Full-Stack Developer",
      twitterDescription: "Portfolio of Amir Rahemi - Skilled full-stack developer specializing in React, Next.js, and modern web technologies.",
      siteName: "Amir Rahemi Portfolio",
      jobTitle: "Full-Stack Developer",
      descriptionSchema: "Full-Stack Developer specializing in React, Next.js, and modern web technologies"
    },
    fa: {
      title: "امیر راحمی - توسعه‌دهنده فول‌استک | متخصص React و Next.js",
      description: "امیر راحمی یک توسعه‌دهنده فول‌استک با تخصص در JavaScript مدرن، React، Next.js، Node.js و TypeScript است. پروژه‌های نمونه کار من را مشاهده کنید و با من در ارتباط باشید.",
      keywords: "امیر راحمی, توسعه دهنده فول استک, برنامه نویس وب, React, Next.js, JavaScript, Node.js, نمونه کار, فرانت اند, بک اند",
      ogTitle: "امیر راحمی - توسعه‌دهنده فول‌استک | React و Next.js",
      ogDescription: "نمونه کار امیر راحمی - توسعه‌دهنده فول‌استک با تخصص در React، Next.js و تکنولوژی‌های مدرن وب. پروژه‌ها و تجربیات من را ببینید.",
      twitterTitle: "امیر راحمی - توسعه‌دهنده فول‌استک",
      twitterDescription: "نمونه کار امیر راحمی - توسعه‌دهنده فول‌استک با تخصص در React، Next.js و تکنولوژی‌های مدرن وب.",
      siteName: "نمونه کار امیر راحمی",
      jobTitle: "توسعه‌دهنده فول‌استک",
      descriptionSchema: "توسعه‌دهنده فول‌استک متخصص در React، Next.js و تکنولوژی‌های مدرن وب"
    }
  };

  const content = seoContent[currentLang];

  return (
    <div className="bg-[white] dark:bg-black h-screen text-white font-paytone rtl:font-lalezar font-medium transition-all capitalize">
    <Helmet>
      {/* HTML attributes for language and direction */}
      <html lang={currentLang} dir={isRTL ? 'rtl' : 'ltr'} className={currentLang} />

      {/* Basic Meta Tags */}
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      <meta name="keywords" content={content.keywords} />
      <meta name="author" content="Amir Rahemi" />
      <meta name="robots" content="index, follow" />
      <meta name="google-site-verification" content="g_1thjCsV9Zsk6mFnfvHTwtioi2tn7J4Zz_4ufHwNrg" />

      {/* Language alternatives for SEO */}
      <link rel="alternate" hrefLang="en" href="https://amirrahemi.com?lang=en" />
      <link rel="alternate" hrefLang="fa" href="https://amirrahemi.com?lang=fa" />
      <link rel="alternate" hrefLang="x-default" href="https://amirrahemi.com" />

      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={content.ogTitle} />
      <meta property="og:description" content={content.ogDescription} />
      <meta property="og:image" content="https://amirrahemi.com/logo.png" />
      <meta property="og:url" content={`https://amirrahemi.com?lang=${currentLang}`} />
      <meta property="og:site_name" content={content.siteName} />
      <meta property="og:locale" content={currentLang === 'fa' ? 'fa_IR' : 'en_US'} />
      <meta property="og:locale:alternate" content={currentLang === 'fa' ? 'en_US' : 'fa_IR'} />

      {/* Canonical URL */}
      <link rel="canonical" href={`https://amirrahemi.com?lang=${currentLang}`} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@madeby_amir" />
      <meta name="twitter:creator" content="@madeby_amir" />
      <meta name="twitter:title" content={content.twitterTitle} />
      <meta name="twitter:description" content={content.twitterDescription} />
      <meta name="twitter:image" content="https://amirrahemi.com/logo.png" />
      <meta name="twitter:image:alt" content={content.twitterTitle} />

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
          "alternateName": "امیر راهمی",
          "jobTitle": content.jobTitle,
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
          "description": content.descriptionSchema,
          "image": "https://amirrahemi.com/logo.png",
          "inLanguage": currentLang === 'fa' ? 'fa-IR' : 'en-US'
        })}
      </script>
    </Helmet>

      <Navbar />

      <div className="flex flex-col justify-center w-full lg:w-3/4 my-0 mx-auto">
        <section className="[height:96vh] flex items-center justify-center flex-col [width: 90%] lg:w-full bg-black rounded-2xl m-4 dark:bg-black dark:m-0 dark:h-screen dark:rounded-none;">
          <div className="absolute bottom-20 z-40 p-3">
            <h2 className="text-2xl md:text-5xl lg:text-8xl">{t("header.hello")}</h2>
            <p className="text-sm md:text-3xl lg:text-5xl">{t("header.Welcome to my slice of the internet")}</p>
          </div>

          <a 
            id={isVisible ? "hide" : "nohide"} 
            className="mouse-scroll z-50" 
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
          ></a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-3 lg:right-10 bottom-14 z-50 text-white dark:text-black rounded-full p-4 text-2xl bg-blue-200 dark:bg-blue-100"
            id={isVisible ? "nohide" : "hide"}
          >
            <MdKeyboardDoubleArrowUp />
          </button>

          <img className="absolute bottom-auto w-64 md:w-72 lg:w-64 lg:[bottom: 4vh]" src={IMG} alt="" />
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