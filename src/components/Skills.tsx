import React from 'react'


import { Css3Original, DockerOriginalWordmark, GitOriginalWordmark, Html5Original, JavascriptOriginal, NextjsOriginal, NodejsOriginalWordmark, ReactOriginal, ReduxOriginal, TailwindcssPlainWordmark, TypescriptOriginal } from 'devicons-react';

type Props = {}

function Skills({ }: Props) {
  return (
    <div>
      <div className="flex flex-col mt-4">
        <h1 className="px-4">my skills</h1>
        <p className="text-slate-300 px-4">
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Amet, aut quibusdam delectus
          beatae earum alias eos aspernatur
          pariatur nemo iste possimus blanditiis
          officia quidem reprehenderit qui quis
          commodi nam voluptates!
        </p>

        <div className="w-full overflow-y-scroll">
          <div className="flex flex-row justify-between text-7xl skills mt-4 py-3 w-fit">
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