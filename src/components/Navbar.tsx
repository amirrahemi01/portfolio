import React from 'react'
import { useTranslation } from 'react-i18next';

import { FaGithub, FaLinkedin, FaMoon, FaXTwitter } from "react-icons/fa6";
import { IoLogoAngular } from "react-icons/io";

type Props = {}

function Navbar({ }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <header className="flex flex-col items-center justify-start float-left fixed top-12 left-12 bottom-12 z-10 isolate">
      <nav className="flex flex-col justify-between items-center flex-auto max-w-12">
        <a href="" className="flex items-center justify-center p-0 w-12 h-12 text-white text-3xl"><IoLogoAngular /></a>
        <ul className="rotate-180 flex flex-row-reverse relative uppercase">
          <li className="block m-0 p-0 pt-8 ">
            <a href="">{t("navbar.work")}</a>
          </li>
          <li className="block m-0 p-0 pt-8 ">
            <a href="">{t("navbar.skills")}</a>
          </li>
          <li className="block m-0 p-0 pt-8 ">
            <a href="">{t("navbar.about")}</a>
          </li>
          <li className="block m-0 p-0 pt-8 ">
            <a href="">{t("navbar.contact")}</a>
          </li>
        </ul>
        <div className="flex flex-col items-center justify-center">
          <a href="https://twitter.com/madeby_amir" className="flex items-center justify-center p-0 w-12 h-12 text-white text-3xl"><FaXTwitter /></a>
          <a href="https://github.com/amirrahemi01" className="flex items-center justify-center p-0 w-12 h-12 text-white text-3xl"><FaGithub /></a>
          <a href="https://linkedin.com/in/amirrahemi" className="flex items-center justify-center p-0 w-12 h-12 text-white text-3xl"><FaLinkedin /></a>
        </div>
      </nav>
      <button className="toggle"><FaMoon /></button>
    </header>
  )
}

export default Navbar