"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import LanguageSwitch from './LanguageSwitch';
import ToggleDark from './ToggleDark';
import ICON from "@/assets/icon/logo.webp";

function Navbar() {
  const { t } = useTranslation("global");
  const pathname = usePathname();
  const router = useRouter();
  
  // NavBar Responsive
  const [isActive, setIsActive] = useState(false);

  // While the mobile menu is open: the page behind it doesn't scroll, Escape closes it, and it
  // closes by itself if the window grows to desktop width (where there is no hamburger).
  useEffect(() => {
    if (!isActive) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsActive(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1025) setIsActive(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [isActive]);

  // Phones and tablets (where the menu is a hamburger): the theme/language/menu pill slides away
  // while you read (scrolling down) and comes back as soon as you scroll up. Desktop keeps it fixed.
  const [pillHidden, setPillHidden] = useState(false);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const HIDE_AFTER = 80; // px from the top before it may hide
    const DOWN_STEP = 6; // px of downward scroll to hide
    const UP_STEP = 10; // px of upward scroll to show, so tiny shakes don't make it flicker
    const compact = window.matchMedia('(max-width: 1025px)');

    const onScroll = () => {
      const y = window.scrollY;
      if (!compact.matches || y <= HIDE_AFTER) {
        setPillHidden(false);
        lastScrollY.current = y;
        return;
      }
      const diff = y - lastScrollY.current;
      if (diff >= DOWN_STEP) {
        setPillHidden(true);
        lastScrollY.current = y;
      } else if (diff <= -UP_STEP) {
        setPillHidden(false);
        lastScrollY.current = y;
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  
  // Add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  
  // Clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  }
  
  // Check if we're on home page (with or without /fa)
  const isHomePage = pathname === '/' || pathname === '/fa' || pathname === '/fa/';
  const isFa = pathname.startsWith('/fa');
  const homePrefix = isFa ? '/fa' : '';

  // Smooth scroll to section — if not on home, navigate to home then scroll
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    removeActive();
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        // fallback: update hash
        window.location.hash = sectionId;
      }
    } else {
      // From another page: go home with the hash. The home page scrolls to the section itself.
      router.push(`${homePrefix || '/'}#${sectionId}`);
    }
  };

  return (
    <>
    <header
      // With the mobile menu open, a tap anywhere that is not a link (the empty area around the texts) closes it.
      onClick={(e) => {
        if (isActive && !(e.target as HTMLElement).closest("a")) removeActive();
      }}
      // iOS Safari does not deliver taps on empty areas to onClick; this makes them count.
      onTouchEnd={(e) => {
        if (isActive && !(e.target as HTMLElement).closest("a")) {
          e.preventDefault();
          removeActive();
        }
      }}
      className={`flex flex-col items-center justify-start float-left fixed top-12 left-12 bottom-12 z-10 isolate nav ${isActive ? "active" : "disable"}`}
    >
      <nav className="flex flex-col justify-between items-center flex-auto max-w-12">
        <Link
          href={homePrefix || '/'}
          onClick={() => {
            removeActive();
            // Already home: smooth-scroll to the top. From another page the router navigates and
            // the new page starts at the top (see ScrollToTop in App.tsx), with no page reload.
            if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center justify-center p-0 w-12 h-12 text-3xl"
          aria-label="Amir Rahemi - Home"
        >
          <Image src={ICON} className="rounded logo" alt="Amir Rahemi logo" width={48} height={48} priority />
        </Link>
        
        <ul className="rotate-180 flex flex-row-reverse relative uppercase [writing-mode:vertical-lr]">
          <li className="block m-0 p-0 pt-8 hover:text-blue-300 dark:hover:text-blue-200 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href={`${homePrefix || ''}#about`}
              onClick={(e) => scrollToSection(e, 'about')}
            >
              {t("navbar.about")}
            </a>
          </li>
          <li className="block m-0 p-0 pt-8 hover:text-blue-300 dark:hover:text-blue-200 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href={`${homePrefix || ''}#skills`}
              onClick={(e) => scrollToSection(e, 'skills')}
            >
              {t("navbar.skills")}
            </a>
          </li>
          <li className="block m-0 p-0 pt-8 hover:text-blue-300 dark:hover:text-blue-200 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href={`${homePrefix || ''}#projects`}
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              {t("navbar.work")}
            </a>
          </li>
          <li className="block m-0 p-0 pt-8 hover:text-blue-300 dark:hover:text-blue-200 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href={`${homePrefix || ''}#contact`}
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              {t("navbar.contact")}
            </a>
          </li>
        </ul>
        
        <div className="flex flex-col items-center justify-center social">
          <a 
            onClick={removeActive} 
            href="https://twitter.com/madeby_amir" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-0 w-12 h-12 text-black dark:text-white text-3xl hover:text-blue-300 dark:hover:text-blue-200"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a 
            onClick={removeActive} 
            href="https://github.com/amirrahemi01" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-0 w-12 h-12 text-black dark:text-white text-3xl hover:text-blue-300 dark:hover:text-blue-200"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            onClick={removeActive} 
            href="https://linkedin.com/in/amirrahemi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-0 w-12 h-12 text-black dark:text-white text-3xl hover:text-blue-300 dark:hover:text-blue-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </nav>
      
    </header>

      {/* Theme + language + menu. One solid pill with its own background, so it stays readable over
          the hero card, over plain page sections, and in both themes.
          It lives OUTSIDE <header>: the header is its own stacking context (z-10), and page sections
          that also use z-10 (the hero, the contact form) were painting on top of the left half of
          this pill, so the EN button could not be clicked on some screen widths. */}
      <div
        dir="ltr"
        // Tabbing into it with the keyboard always brings it back. Stays put while the menu is open.
        onFocusCapture={() => setPillHidden(false)}
        className={`fixed z-[9999] top-4 right-4 sm:top-6 sm:right-6 lg:top-12 lg:right-12 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 p-1 shadow-sm backdrop-blur transition-transform duration-150 motion-reduce:transition-none dark:border-white/15 dark:bg-black/85 ${
          pillHidden && !isActive ? '-translate-y-[200%]' : ''
        }`}
      >
        <LanguageSwitch />
        <ToggleDark />
        <button
          type="button"
          onClick={toggleActiveClass}
          aria-label={t('navbar.menu')}
          aria-expanded={isActive}
          className={`hamburger h-9 w-9 place-items-center rounded-full hover:bg-black/10 dark:hover:bg-white/15 ${isActive ? 'active' : ''}`}
        >
          <span className="bars">
            <span className="bar bg-black dark:bg-white"></span>
            <span className="bar bg-black dark:bg-white"></span>
            <span className="bar bg-black dark:bg-white"></span>
          </span>
        </button>
      </div>
    </>
  );
}

export default Navbar;