import React from 'react';

import Html5Original from 'devicons-react/lib/icons/Html5Original';
import Css3Original from 'devicons-react/lib/icons/Css3Original';
import JavascriptOriginal from 'devicons-react/lib/icons/JavascriptOriginal';
import TypescriptOriginal from 'devicons-react/lib/icons/TypescriptOriginal';
import ReactOriginal from 'devicons-react/lib/icons/ReactOriginal';
import NextjsOriginal from 'devicons-react/lib/icons/NextjsOriginal';
import NodejsOriginalWordmark from 'devicons-react/lib/icons/NodejsOriginalWordmark';
import TailwindcssPlainWordmark from 'devicons-react/lib/icons/TailwindcssPlainWordmark';
import GitOriginalWordmark from 'devicons-react/lib/icons/GitOriginalWordmark';
import ReduxOriginal from 'devicons-react/lib/icons/ReduxOriginal';
import DockerOriginalWordmark from 'devicons-react/lib/icons/DockerOriginalWordmark';

import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

function Skills() {
  const [t, i18n] = useTranslation("global");

  const isFa = (i18n.language || 'en') as 'en' | 'fa';

  return (
    <div id="skills">
      <div className="flex flex-col mt-4">
        <h2 className={clsx("px-4 text-2xl", isFa === "fa" ? "text-right" : "text-left")}>{t("content.my skills")}</h2>
        {/* <p dir="auto" className={clsx("dark:text-slate-300 text-slate-800 text-sm large:text-base px-4 text-left", isFa === "fa" ? "text-right" : "text-left")}>{t("content.skills")}</p> */}

        <div className="w-full overflow-x-scroll overflow-y-hidden md:overflow-x-auto md:flex md:justify-center">
          <div className="flex flex-row text-7xl skills mt-4 py-3 w-fit">
            <Html5Original className="text-white dark:text-black" />
            <Css3Original className="text-white dark:text-black" />
            <JavascriptOriginal className="text-white dark:text-black" />
            <TypescriptOriginal className="text-white dark:text-black" />
            <ReactOriginal className="text-white dark:text-black" />
            <NextjsOriginal className="text-white dark:text-black" />
            <NodejsOriginalWordmark className="text-white dark:text-black" />
            <TailwindcssPlainWordmark className="text-white dark:text-black" />
            <GitOriginalWordmark className="text-white dark:text-black" />
            <ReduxOriginal className="text-white dark:text-black" />
            <DockerOriginalWordmark className="text-white dark:text-black" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills