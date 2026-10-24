"use client";

import React from 'react'

import { FaCamera, FaDumbbell, FaHeadphones, FaRoad } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TiVideo } from "react-icons/ti";
import Image from 'next/image';
import Link from 'next/link';
import { useLang, useTranslation } from '@/i18n';

import IMG1 from "@/assets/image/cover2.webp";
import DragScroll from "./DragScroll";
import Skills from "./Skills";


function About() {
  const [t, i18n] = useTranslation("global");
  const { prefix } = useLang();

  const isFa = (i18n.language || 'en') as 'en' | 'fa';

  return (
    <div className="w-full bg-white dark:bg-black md:p-12 p-4" id="about">
      <div className="flex flex-col md:flex-row px-4">
        <div className="w-full ml-auto p-5">
          <Image src={IMG1} alt="Amir Rahemi portrait" className="a w-full aspect-square object-cover" sizes="(min-width: 768px) 40vw, 90vw" />
        </div>
        <br />

        <div className="flex flex-col justify-center gap-3" dir={isFa === "fa" ? "rtl" : "ltr"} >
          <h2 className="type-title text-left rtl:text-right">{t("content.amirrahemi")}</h2>
          <h2 className="type-label !text-blue-300 dark:!text-blue-200 text-left rtl:text-right">{t("content.role")}</h2>
          <p dir="auto" className="type-body text-left rtl:text-right">{t("content.reactjs")}</p>

          <Link
            href={`${prefix}/cv`}
            className="flex bg-blue-300 dark:bg-blue-200 text-white dark:text-black w-fit mt-4 py-2 px-4 rounded-md"
          >
            <span className="optical-y-en">{t("content.download cv")}</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <h2 className="type-heading px-4 text-left rtl:text-right">{t("content.my interests")}</h2>

        <DragScroll className="flex flex-row mt-4 p-3 overflow-x-auto overflow-y-hidden text-black/65 dark:text-white/65">
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaHeadphones className="mx-2 text-blue-300 dark:text-blue-200 text-4xl" />
            <p>{t("content.music")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaDumbbell className="mx-2 text-blue-300 dark:text-blue-200 text-4xl" />
            <p>{t("content.sport")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <IoGameController className="mx-2 text-blue-300 dark:text-blue-200 text-4xl" />
            <p>{t("content.game")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <TiVideo className="mx-2 text-blue-300 dark:text-blue-200 text-4xl" />
            <p>{t("content.movie")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaCamera className="mx-2 text-blue-300 dark:text-blue-200 text-4xl" />
            <p>{t("content.photo")}</p>
          </div>
          <div className="flex items-center w-fit mx-5 shrink-0 select-none">
            <FaRoad className="mx-2 text-blue-300 dark:text-blue-200 text-4xl" />
            <p>{t("content.travel")}</p>
          </div>
        </DragScroll>

        <Skills />
      </div>
    </div>
  )
}

export default About