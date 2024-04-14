import React from 'react'

import { FaCamera, FaDumbbell, FaHeadphones, FaRoad } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TiVideo } from "react-icons/ti";
import { useTranslation } from 'react-i18next';

import IMG1 from "../assets/image/cover2.png";

import Skills from './Skills';

type Props = {}

function About({ }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="w-full bg-white dark:bg-black" id="about">
      <div className="flex flex-col md:flex-row px-4">
        <div className="w-full ml-auto p-5">
          <img src={IMG1} alt="" className="a w-full" />
        </div>
        <br />

        <div className="flex flex-col justify-center">
          <h1 className="text-base lg:text-5xl text-blue-200 dark:text-blue-100">{t("content.amirrahemi")}</h1>
          <h2 className="text-base lg:text-2xl text-black dark:text-white">REACT.JS DEVELOPER</h2>
          <p className="text-slate-800 dark:text-slate-300 text-sm lg:text-base text-justify">{t("content.reactjs")}</p>

          <button className="flex bg-blue-200 dark:bg-blue-100 text-white dark:text-black w-fit mt-4 py-2 px-4 rounded-md">{t("content.download cv")}</button>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <h1 className="px-4 text-2xl text-black dark:text-white">{t("content.my interests")}</h1>

        <div className="flex flex-row justify-between mt-4 p-3 overflow-y-hidden overflow-x-scroll md:overflow-x-auto md:justify-center text-black dark:text-white">
          <div className="flex items-center w-fit mx-5">
            <FaHeadphones className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.music")}</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <FaDumbbell className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.sport")}</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <IoGameController className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.game")}</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <TiVideo className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.movie")}</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <FaCamera className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.photo")}</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <FaRoad className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.travel")}</p>
          </div>
        </div>

        <Skills />
      </div>
    </div>
  )
}

export default About