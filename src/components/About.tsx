import React from 'react'

import IMG1 from "../assets/image/cover2.png";
import { FaCamera, FaDumbbell, FaHeadphones, FaRoad } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TiVideo } from "react-icons/ti";
import Skills from './Skills';


type Props = {}

function About({ }: Props) {
  return (
    <div className="w-full" id="about">
      <div className="flex flex-col md:flex-row px-4">
        <div className="w-full ml-auto p-5">
        <img src={IMG1} alt="" className="a w-full" />
        </div>
        <br />

        <div className="flex flex-col justify-center">
          <h1 className="text-base lg:text-5xl text-blue-100">Amir Rahemi</h1>
          <h2 className="text-base lg:text-2xl">REACT.JS DEVELOPER</h2>
          <p className="text-slate-300 text-sm lg:text-base">
            Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
            Amet, aut quibusdam delectus
            beatae earum alias eos aspernatur
            pariatur nemo iste possimus blanditiis
            officia quidem reprehenderit qui quis
            commodi nam voluptates!
          </p>

          {/* <p className="text-slate-300">
            Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
            Amet, Aut Quibusdam Delectus.
          </p> */}
 
          <button className="flex bg-blue-100 text-black w-fit mt-4 py-2 px-4 rounded-md">Download CV</button>
        </div>
      </div>
      

      <div className="flex flex-col mt-4">
        <h1 className="px-4 text-2xl">my interests</h1> 

        <div className="flex flex-row justify-between mt-4 p-3 overflow-y-scroll md:overflow-y-auto md:justify-center">
          <div className="flex items-center w-fit mx-5">
            <FaHeadphones className="mx-2 text-blue-100 text-4xl" />
            <p>Music</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <FaDumbbell  className="mx-2 text-blue-100 text-4xl"/>
            <p>sport</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <IoGameController className="mx-2 text-blue-100 text-4xl" />
            <p>game</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <TiVideo  className="mx-2 text-blue-100 text-4xl"/>
            <p>movie</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <FaCamera  className="mx-2 text-blue-100 text-4xl"/>
            <p>photo</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            <FaRoad className="mx-2 text-blue-100 text-4xl" />
            <p>travel</p>
          </div>
        </div>
          
          <Skills />
      </div>
    </div>
  )
}

export default About