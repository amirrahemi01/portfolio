import React from 'react'


import { Css3Original, DockerOriginalWordmark, GitOriginalWordmark, Html5Original, JavascriptOriginal, NextjsOriginal, NodejsOriginalWordmark, ReactOriginal, ReduxOriginal, TailwindcssPlainWordmark, TypescriptOriginal } from 'devicons-react';
import { useTranslation } from 'react-i18next';

type Props = {}

function Skills({ }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="skills">
      <div className="flex flex-col mt-4">
        <h1 className="px-4 text-2xl">{t("content.my skills")}</h1>
        <p className="text-slate-300 px-4">
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Amet, aut quibusdam delectus
          beatae earum alias eos aspernatur
          pariatur nemo iste possimus blanditiis
          officia quidem reprehenderit qui quis
          commodi nam voluptates!
        </p>

        <div className="w-full overflow-y-scroll md:overflow-y-auto md:flex md:justify-center">
          <div className="flex flex-row text-7xl skills mt-4 py-3 w-fit">
            <Html5Original />
            <Css3Original />
            <JavascriptOriginal />
            <TypescriptOriginal />
            <ReactOriginal />
            <NextjsOriginal />
            <NodejsOriginalWordmark />
            <TailwindcssPlainWordmark />
            <GitOriginalWordmark />
            <ReduxOriginal />
            <DockerOriginalWordmark />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills