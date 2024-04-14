import React from 'react'

import IMG_RENT from "../assets/image/projects/rent.jpg";
import IMG_ECOMMERCE from "../assets/image/projects/ecommerce.png";
import IMG_FOOD from "../assets/image/projects/food.jpg";

import { useTranslation } from 'react-i18next';

type Props = {}


function Projects({ }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="w-full" id="projects">
      <h1 className="text-5xl text-blue-200 dark:text-blue-100 px-4">{t("content.projects")}</h1>
      <p className="text-slate-800 dark:text-slate-300 px-4 text-justify text-2xl">{t("content.my skills")}</p>


      <div className="flex flex-row mt-4 py-3 overflow-y-hidden overflow-x-scroll md:overflow-x-auto">
        <div className="flex flex-col bg-slate-600 dark:bg-slate-100 p-5 rounded-2xl w-full h-full lg:w-1/3 mx-5 [min-height:65vh]">

          <div className="topimg">
            <img src={IMG_ECOMMERCE} alt="" className="w-full rounded-xl" />
          </div>

          <div className="text-white dark:text-black">
            <h2 className="mt-4 text-2xl lg:text-4xl">{t("content.e-commerce")}</h2>
            <p className="text-justify">{t("content.shopping")}</p>
          </div>

          <div className="flex flex-row text-green-100">
            <p className="mr-2">#react.js</p>
            <p className="mr-2">#mongodb</p>
          </div>

        </div>
        <div className="flex flex-col bg-slate-600 dark:bg-slate-100 p-5 rounded-2xl w-full h-full lg:w-1/3 mx-5 [min-height:65vh]">

          <div className="topimg">
            <img src={IMG_RENT} alt="" className="w-full rounded-xl" />
          </div>

          <div className="text-white dark:text-black">
            <h2 className="mt-4 text-2xl lg:text-4xl">{t("content.rent car")}</h2>
            <p className="text-justify">{t("content.rent")}</p>
          </div>

          <div className="flex flex-row text-green-100">
            <p className="mr-2">#react.js</p>
            <p className="mr-2">#mongodb</p>
          </div>

        </div>
        <div className="flex flex-col bg-slate-600 dark:bg-slate-100 p-5 rounded-2xl w-full h-full lg:w-1/3 mx-5 [min-height:65vh]">

          <div className="topimg">
            <img src={IMG_FOOD} alt="" className="w-full rounded-xl" />
          </div>

          <div className="text-white dark:text-black">
            <h2 className="mt-4 text-2xl lg:text-4xl">{t("content.food delivery")}</h2>            
            <p className="text-justify">{t("content.shopping")}</p>
          </div>

          <div className="flex flex-row text-green-100">
            <p className="mr-2">#react.js</p>
            <p className="mr-2">#mongodb</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Projects