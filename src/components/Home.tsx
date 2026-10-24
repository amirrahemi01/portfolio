"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { useLang, useTranslation } from "@/i18n";
import { siteContent } from "@/data/site";
import Navbar from "./Navbar";
import About from "./About";
import Projects from "./Projects";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import IMG from "@/assets/image/cover.webp";

export default function Home() {
  const [t] = useTranslation();
  const { lang: currentLang, prefix } = useLang();

  // Fades the "scroll" hint out and the go-to-top button in once you leave the top of the page.
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
    window.addEventListener("scroll", listenToScroll, { passive: true });
    // After a refresh the browser restores the old scroll position without a scroll event we can
    // rely on, so check the position right away and again once the restore has finished.
    // (Otherwise the "scroll" hint showed in the middle of the page and the go-to-top button hid.)
    listenToScroll();
    const timers = [100, 400, 1000].map((ms) => window.setTimeout(listenToScroll, ms));
    window.addEventListener("pageshow", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
      window.removeEventListener("pageshow", listenToScroll);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [listenToScroll]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen text-white font-medium">
      <Navbar />
      <main id="main" className="flex flex-col w-full lg:w-[78%] xl:w-3/4 my-0 mx-auto px-0 sm:px-4">
        {/* HERO — redesigned, responsive, RTL/LTR aware */}
        <section
          dir={currentLang === "fa" ? "rtl" : "ltr"}
          className="relative min-h-screen supports-[height:100svh]:min-h-[max(100svh,560px)] sm:min-h-[560px] sm:my-4 sm:h-[calc(100vh-2rem)] sm:supports-[height:100svh]:h-[calc(100svh-2rem)] w-full overflow-hidden rounded-none sm:rounded-[2rem] bg-[#070708] dark:bg-white border border-white/5 dark:border-black/5 shadow-2xl flex items-center"
        >

          <div
            className="relative z-10 w-full h-full min-h-[inherit] sm:min-h-0 flex flex-col lg:flex-row items-center lg:justify-center gap-6 lg:gap-10 px-5 sm:px-8 lg:px-10 pt-20 pb-10 sm:py-12 lg:py-10"
          >
            {/* Text */}
            <div className="shrink-0 lg:flex-1 flex flex-col justify-center w-full items-start text-start">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-black/[0.04] border border-white/10 dark:border-black/10 text-[11px] tracking-[0.18em] uppercase text-white/80 dark:text-black/60 mb-5 backdrop-blur">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {/* Vazirmatn draws Latin capitals ~0.13em above the line box's center; Persian sits centered */}
                <span className="relative ltr:top-[0.13em]">{t("hero.badge")}</span>
              </span>

              <h1 className={clsx("font-black leading-[0.9] tracking-tight", currentLang === "fa" ? "text-5xl sm:text-6xl" : "text-[2.6rem] sm:text-5xl lg:text-6xl")}>
                <span className="block text-white dark:text-black font-normal text-3xl sm:text-4xl lg:text-5xl mb-1 opacity-90">{t("header.hello")}</span>
                <span className="block">
                  <span className="text-white dark:text-black">{t("hero.firstName")}</span>{" "}
                  <span className="text-blue-200 dark:text-blue-300">{t("hero.lastName")}</span>
                  {/* Persian ends the sentence with "هستم." — styled like the greeting line */}
                  {t("hero.nameSuffix") && (
                    <>
                      {" "}
                      <span className="text-white dark:text-black font-normal text-3xl sm:text-4xl lg:text-5xl opacity-90">
                        {t("hero.nameSuffix")}
                      </span>
                    </>
                  )}
                </span>
              </h1>

              <p
                className="mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/65 dark:text-black/60 text-left rtl:text-right"
              >
                {t("header.Welcome to my slice of the internet")}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-white/60 dark:text-black/60 text-left rtl:text-right">
                {t("hero.tagline")}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 w-full justify-start">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, "projects")}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 ltr:pt-[13.5px] ltr:pb-[10.5px] rounded-full bg-white text-black dark:bg-black dark:text-white font-bold text-sm hover:scale-[1.03] active:scale-95 transition-transform shadow-lg"
                >
                  {t("hero.viewProjects")} <span className="rtl:rotate-180">→</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 ltr:pt-[13.5px] ltr:pb-[10.5px] rounded-full border border-white/20 dark:border-black/10 text-white dark:text-black text-sm font-bold backdrop-blur hover:bg-white/10 dark:hover:bg-black/5 transition-colors"
                >
                  {t("hero.letsTalk")}
                </a>
                <Link
                  href={`${prefix}/cv`}
                  className="hidden sm:inline-flex items-center justify-center px-5 py-3 ltr:pt-[13.5px] ltr:pb-[10.5px] rounded-full bg-white/10 dark:bg-black/5 border border-white/10 dark:border-black/10 text-white/80 dark:text-black/70 text-sm backdrop-blur hover:bg-white/15 transition-colors"
                >
                  {t("hero.cv")}
                </Link>
              </div>

              <div className="mt-8 flex gap-6 sm:gap-8 w-full border-t border-white/10 dark:border-black/5 pt-6 justify-center text-center sm:justify-start sm:text-start">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white dark:text-black">{siteContent.stats.years}</div>
                  <div className="text-[10px] tracking-[0.18em] uppercase text-white/60 dark:text-black/60">{t("hero.statYears")}</div>
                </div>
              </div>
            </div>

            {/* Image */}
            {/* On phones/tablets the photo takes whatever height is left, so the hero is exactly one screen. */}
            <div className="flex-1 min-h-[300px] lg:min-h-0 lg:flex-none lg:w-[34%] w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] relative">
              <div className="absolute inset-0 lg:relative lg:inset-auto lg:aspect-[4/5] w-full overflow-hidden rounded-[1.8rem] sm:rounded-[2rem] border border-white/10 dark:border-black/5 bg-[#0f0f10] dark:bg-[#f8f8f8] shadow-2xl">
                <Image
                  src={IMG}
                  alt="Amir Rahemi - Full-Stack Developer"
                  priority
                  fetchPriority="high"
                  fill
                  sizes="(min-width: 1024px) 440px, 400px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* scroll indicator */}
          <a
            id={isVisible ? "hide" : "nohide"}
            className={clsx("mouse-scroll z-20 hidden sm:flex", !isVisible && "pointer-events-none")}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            aria-label={t("navbar.about") || "Scroll to About section"}
          >
            <span className="sr-only">{t("navbar.about") || "Scroll to About section"}</span>
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-2 sm:right-3 lg:right-6 bottom-10 sm:bottom-6 z-50 rounded-full p-3 sm:p-3.5 text-xl bg-black text-white dark:bg-white dark:text-black border border-white/15 dark:border-black/10 hover:bg-blue-300 hover:text-white dark:hover:bg-blue-300 dark:hover:text-white transition-colors shadow-lg"
            id={isVisible ? "nohide" : "hide"}
            aria-label="Scroll to top"
          >
            <MdKeyboardDoubleArrowUp />
          </button>
        </section>

        <div className="h-6 sm:h-8" />

        <section className="scroll-mt-[72px]">
          <About />
        </section>

        <section className="scroll-mt-[72px] mt-6 sm:mt-8">
            <Projects />
        </section>

        <section className="scroll-mt-[72px] mt-6 sm:mt-8">
            <ContactUs />
        </section>
      </main>
      <Footer />
    </div>
  );
}
