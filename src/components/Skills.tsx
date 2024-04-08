import React from 'react'

type Props = {}

function Skills({ }: Props) {
  return (
    <div>
      <div className="flex flex-col">
        <h1>my interests</h1>
        <p>
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Amet, aut quibusdam delectus
          beatae earum alias eos aspernatur
          pariatur nemo iste possimus blanditiis
          officia quidem reprehenderit qui quis
          commodi nam voluptates!
        </p>
        <div className="flex flex-row">
          <div className="flex items-center w-fit mx-5">
            {/* <FaHeadphones className="mx-2 text-blue-100 text-4xl" /> */}
            <p>HTML</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            {/* <FaDumbbell className="mx-2 text-blue-100 text-4xl" /> */}
            <p>CSS</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            {/* <IoGameController className="mx-2 text-blue-100 text-4xl" /> */}
            <p>TAILWIND.CSS</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            {/* <TiVideo className="mx-2 text-blue-100 text-4xl" /> */}
            <p>TYPESCRIPT</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            {/* <FaCamera className="mx-2 text-blue-100 text-4xl" /> */}
            <p>REACT.JS</p>
          </div>
          <div className="flex items-center w-fit mx-5">
            {/* <FaRoad className="mx-2 text-blue-100 text-4xl" /> */}
            <p>NEXT.JS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills