import React from 'react'


import { Css3Original, DockerOriginalWordmark, GitOriginalWordmark, Html5Original, JavascriptOriginal, NextjsOriginal, NodejsOriginalWordmark, ReactOriginal, ReduxOriginal, TailwindcssPlainWordmark, TypescriptOriginal } from 'devicons-react';

type Props = {}

function Skills({ }: Props) {
  return (
    <div>
      <div className="flex flex-col">
        <h1>my skills</h1>
        <p className="text-slate-300">
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Amet, aut quibusdam delectus
          beatae earum alias eos aspernatur
          pariatur nemo iste possimus blanditiis
          officia quidem reprehenderit qui quis
          commodi nam voluptates!
        </p>
        <br />

        <div className="flex flex-row justify-between text-7xl skills">
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
  )
}

export default Skills