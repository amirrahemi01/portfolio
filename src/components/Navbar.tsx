import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import MultiLang from './MultiLang';
import ToggleDark from './ToggleDark';
import ICON from "../assets/icon/logo.png";

function Navbar() {
  const { t } = useTranslation("global");
  
  // NavBar Responsive
  const [isActive, setIsActive] = useState(false);
  
  // Add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  
  // Clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  }
  
  // Smooth scroll to section without changing URL
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    removeActive();
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className={`flex flex-col items-center justify-start float-left fixed top-12 left-12 bottom-12 z-10 isolate nav ${isActive ? "active" : "disable"}`}>
      <nav className="flex flex-col justify-between items-center flex-auto max-w-12">
        <a 
          href="/" 
          className="flex items-center justify-center p-0 w-12 h-12 text-3xl"
          aria-label="Amir Rahemi - Home"
        >
          <img src={ICON} className="rounded logo" alt="Amir Rahemi logo" width="48" height="48" />
        </a>
        
        <ul className="rotate-180 flex flex-row-reverse relative uppercase [writing-mode:vertical-lr]">
          <li className="block m-0 p-0 pt-8 hover:text-blue-200 dark:hover:text-blue-100 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
            >
              {t("navbar.about")}
            </a>
          </li>
          <li className="block m-0 p-0 pt-8 hover:text-blue-200 dark:hover:text-blue-100 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href="#skills" 
              onClick={(e) => scrollToSection(e, 'skills')}
            >
              {t("navbar.skills")}
            </a>
          </li>
          <li className="block m-0 p-0 pt-8 hover:text-blue-200 dark:hover:text-blue-100 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              {t("navbar.work")}
            </a>
          </li>
          <li className="block m-0 p-0 pt-8 hover:text-blue-200 dark:hover:text-blue-100 [writing-mode:vertical-rl] text-black dark:text-white">
            <a 
              href="#contact" 
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
            className="flex items-center justify-center p-0 w-12 h-12 text-black dark:text-white text-3xl hover:text-blue-200 dark:hover:text-blue-100"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a 
            onClick={removeActive} 
            href="https://github.com/amirrahemi01" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-0 w-12 h-12 text-black dark:text-white text-3xl hover:text-blue-200 dark:hover:text-blue-100"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            onClick={removeActive} 
            href="https://linkedin.com/in/amirrahemi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-0 w-12 h-12 text-black dark:text-white text-3xl hover:text-blue-200 dark:hover:text-blue-100"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </nav>
      
      <div dir="ltr" className="fixed z-40 top-4 right-4 lg:top-16 lg:right-12 transform translate-z-[0] text-base flex items-start text-gray-300 toggle">
        <ToggleDark />
        <MultiLang />
        <div className={`hamburger ${isActive ? "active" : ''}`} onClick={toggleActiveClass}>
          <span className="bar bg-gray-100"></span>
          <span className="bar bg-gray-100"></span>
          <span className="bar bg-gray-100"></span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;