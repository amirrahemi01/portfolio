import React from 'react'
import { FaGithub } from 'react-icons/fa6'

import IMG_RENT from "../assets/image/projects/rent.jpg";
import IMG_ECOMMERCE from "../assets/image/projects/ecommerce.png";
import IMG_FOOD from "../assets/image/projects/food.jpg";
import { useTranslation } from 'react-i18next';

type Props = {}

//  eslint-disable-next-line

function Projects({ }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="w-full" id="projects">
      <h1 className="text-5xl text-blue-100 px-4">{t("content.projects")}</h1>
      <p className="text-slate-300 px-4">
        Following projects showcases my skills and experience through
        real-world examples of my work. Each project is briefly described
        with links to code repositories and live demos in it. It reflects
        my ability to solve complex problems, work with different technologies,
        and manage projects effectively.
      </p>

      <div className="flex flex-row mt-4 py-3 overflow-y-scroll md:overflow-y-auto">
        <div className="flex flex-col bg-slate-100 p-5 rounded-2xl w-full h-full lg:w-1/3 mx-5">
          {/* <div className="absolute bg-white text-black rounded-full text-3xl">
            <a href="https://github.com">
              <FaGithub />
            </a>
          </div> */}
          <div className="topimg">
            <img src={IMG_ECOMMERCE} alt="" className="w-full rounded-xl" />
          </div>

          <div className="text-black">
            <h2 className="text-4xl">{t("content.e-commerce")}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Labore distinctio quibusdam laborum, quis quam cupiditate
              sapiente quaerat hic cumque aliquam officiis eum laboriosam,
              ipsam facere. Aperiam asperiores officia minima error.
            </p>
          </div>

          <div className="flex flex-row text-green-100">
            <p className="mr-2">#react.js</p>
            <p className="mr-2">#mongodb</p>
          </div>

        </div>
        <div className="flex flex-col bg-slate-100 p-5 rounded-2xl w-full h-full lg:w-1/3 mx-5">
          {/* <div className="absolute bg-white text-black rounded-full text-3xl">
            <a href="https://github.com">
              <FaGithub />
            </a>
          </div> */}
          <div className="topimg">
            <img src={IMG_RENT} alt="" className="w-full rounded-xl" />
          </div>

          <div className="text-black">
            <h2 className="text-4xl">{t("content.rent car")}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Labore distinctio quibusdam laborum, quis quam cupiditate
              sapiente quaerat hic cumque aliquam officiis eum laboriosam,
              ipsam facere. Aperiam asperiores officia minima error.
            </p>
          </div>

          <div className="flex flex-row text-green-100">
            <p className="mr-2">#react.js</p>
            <p className="mr-2">#mongodb</p>
          </div>

        </div>
        <div className="flex flex-col bg-slate-100 p-5 rounded-2xl w-full h-full lg:w-1/3 mx-5">
          {/* <div className="absolute bg-white text-black rounded-full text-3xl">
            <a href="https://github.com">
              <FaGithub />
            </a>
          </div> */}
          <div className="topimg">
            <img src={IMG_FOOD} alt="" className="w-full rounded-xl" />
          </div>

          <div className="text-black">
            <h2 className="text-4xl">{t("content.food delivery")}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Labore distinctio quibusdam laborum, quis quam cupiditate
              sapiente quaerat hic cumque aliquam officiis eum laboriosam,
              ipsam facere. Aperiam asperiores officia minima error.
            </p>
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