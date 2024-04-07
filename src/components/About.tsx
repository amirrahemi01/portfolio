import React from 'react'

type Props = {}

function About({ }: Props) {
  return (
    <div>
      <div className="a">
        <h2>I AM A REACT.JS DEVELOPER</h2>
        <p>
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Amet, aut quibusdam delectus
          beatae earum alias eos aspernatur
          pariatur nemo iste possimus blanditiis
          officia quidem reprehenderit qui quis
          commodi nam voluptates!
        </p>
        <img src="amir" alt="" />
        <button>Download CV</button>
      </div>
      
      <div className="d">
        <h1>my interests</h1>
        <div className="e">
          <div className="f">
            <b>x</b>
          </div>
          <div className="f">
            <b>y</b>
          </div>
          <div className="f">
            <b>z</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About