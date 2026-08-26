import React, { Suspense } from 'react'

import { FaCamera, FaDumbbell, FaHeadphones, FaRoad } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TiVideo } from "react-icons/ti";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";

import IMG1 from "../assets/image/cover2.png";
import DragScroll from "./DragScroll";

const Skills = React.lazy(() => import('./Skills'));

function About() {
  const [t, i18n] = useTranslation("global");

  const isFa = (i18n.language || 'en') as 'en' | 'fa';

  return (
    <div className="w-full bg-white dark:bg-black md:p-12 p-4" id="about">
      <div className="flex flex-col md:flex-row px-4">
        <div className="w-full ml-auto p-5">
          <img src={IMG1} alt="Amir Rahemi portrait" className="a w-full aspect-square object-cover" loading="lazy" />
        </div>
        <br />

        <div className="flex flex-col justify-center" dir={isFa ? "rtl" : "ltr"} >
          <h1 className={clsx("text-base lg:text-5xl text-blue-200 dark:text-blue-100", isFa === "fa" ? "text-right" : "text-left")}>{t("content.amirrahemi")}</h1>
          <h2 className={clsx("text-base lg:text-2xl text-black dark:text-white", isFa === "fa" ? "text-right" : "text-left")}>NEXT.JS DEVELOPER</h2>
          <p dir="auto" className={clsx("text-slate-800 dark:text-slate-300 text-sm lg:text-base text-left", isFa === "fa" ? "text-right" : "text-left")}>{t("content.reactjs")}</p>

          <button
            className="flex bg-blue-200 dark:bg-blue-100 text-white dark:text-black w-fit mt-4 py-2 px-4 rounded-md"
            onClick={() => window.open("/AmirRahemiCV.pdf", "_blank")}
          >
            {t("content.download cv")}
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <h2 className={clsx("px-4 text-2xl text-black dark:text-white", isFa === "fa" ? "text-right" : "text-left")}>{t("content.my interests")}</h2>

        <DragScroll className="flex flex-row mt-4 p-3 overflow-x-auto overflow-y-hidden text-black dark:text-white">
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaHeadphones className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.music")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaDumbbell className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.sport")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <IoGameController className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.game")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <TiVideo className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.movie")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaCamera className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.photo")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaRoad className="mx-2 text-blue-200 dark:text-blue-100 text-4xl" />
            <p>{t("content.travel")}</p>
          </div>
        </DragScroll>

        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </div>
    </div>
  )
}

export default About