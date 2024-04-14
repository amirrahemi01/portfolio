import React from 'react';

import { Css3Original, DockerOriginalWordmark, GitOriginalWordmark, Html5Original, JavascriptOriginal, NextjsOriginal, NodejsOriginalWordmark, ReactOriginal, ReduxOriginal, TailwindcssPlainWordmark, TypescriptOriginal } from 'devicons-react';

import { useTranslation } from 'react-i18next';

type Props = {}

function Skills({ }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="skills">
      <div className="flex flex-col mt-4">
        <h1 className="px-4 text-2xl">{t("content.my skills")}</h1>
        <p className="dark:text-slate-300 text-slate-800 px-4 text-justify">{t("content.skills")}</p>

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