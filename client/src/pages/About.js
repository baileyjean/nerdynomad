import React from 'react'
import nerdyNomadBadge from '../styles/images/nerdyNomadBadge.png'
import logo from '../styles/images/Logo-NerdyNomad.png'

const About = (props) => {
  return(
    <div className="about">
      <div>
        <img 
          src={logo} 
          alt="Nerdy Nomad logo - it v nice" 
          style={{width: '25em', height: 'auto', margin: '0.5em', padding: '0', boxShadow: '0 -2px 5px 1px black'}}
        />
      </div>
      <div className="about-paragraphs">
        <h3>
          Nerdy Nomad is the only resource on the web giving users a list of science centers in each state AND rewarding the combination of wanderlust and nerdism!
        </h3>
        <p>
          Almost everyone LOVES to put "travel" as one of their passions on their dating profile and Twitter bio, but did you know that <a href="https://livability.com/topics/careers-opportunities/how-many-states-has-the-average-american-visited" target="_blank" rel="noreferrer">the average American has only been to 12 states?!</a> 
        </p>
        </div>
        <div>
          Weird that people are lying on their dating profiles....
          <br />
          <iframe src="https://giphy.com/embed/5VKbvrjxpVJCM" width="480" height="384" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/5VKbvrjxpVJCM">via GIPHY</a></p>
        </div>
        <div className="about-paragraphs">
        <p>
          Based on purely anecdotal evidence (inadvertently) collected over a lifetime, I've also discovered that most people don't realize there's a science center in EVERY major city. What's more: <u>nobody</u> I've spoken with knew that EVERY state has some kind of science center available for the public to enjoy! (Including <a href="https://en.wikipedia.org/wiki/List_of_science_centers_in_the_United_States" target="_blank" rel="noreferrer">Wikipedia!!!!</a>)
        </p>
        <br />
        <p>
        The ultimate hope for Nerdy Nomad is that YOU will use it and contribute to it as much as I have, helping build the most comprehensive, crowd-sourced collection of science centers and museums in the U.S.! Special care was taken to add the smaller, non-profit science centers as the database was being built-out. Support for these little fellas has always been lacking, so Nerdy Nomad is here to show them some love!
        </p>
        <br />
        <p>
          Nerdy Nomad was born from the combined love of travel and science, and it REWARDS you for pursuing both! When you sign-up, you'll select the number of science centers and states you've visited, which allows Nerdy Nomad to assign you a Nerd Rating (out of 5) and a Nomad Rating (out of 10). IF you have sufficiently high Nerd and Nomad Ratings, you get rewarded the Nerdy Nomad Badge!!
        </p>
      </div>
      <div>
        Just look how cute he is tho!
        <br />
        <img 
          src={nerdyNomadBadge} 
          alt="LOOK HOW CUTE HE IS THO" 
          style={{width: '25em', height: 'auto', margin: '0.5em', padding: '0', boxShadow: '0 -2px 5px 1px black'}}
        />
      </div>
      <h2>Behind the Scenes</h2>
      <div className="about-paragraphs">
        <p>My name is Bailey Leavitt, and I created Nerdy Nomad! I have a Nerd Rating of 5, and a Nomad Rating of 9. As of 2021, I've travelled to 42 states, I've been to science centers in 7, and I worked in a few research labs throughout the country. Most of the travelling I've done has been on the road, and I'm excited to implement some mapping and navigation features into Nerdy Nomad next... that way all of us can take it on our roadtrips and make stops at science centers along the way!</p>
        <br />
        <p>
          Nerdy Nomad was created as my capstone project for <a href="https://generalassemb.ly/education/software-engineering-immersive-remote" target="_blank" rel="noreferrer">General Assembly's Software Engineering Immersive bootcamp</a>. For any tech nerds and fellow devs out there, I used the PERN stack (PostgreSQL / Express / React / NodeJS). For all you non-technical nerds: everything from the database which houses all the data accessible through the site (science center data, user profiles, comments, and ratings) to the exact webpage you're interacting with now (referred to as the backend and frontend, respectively) was written by me, from the ground-up (with some support from the amazing General Assembly team and my fellow students, of course).
        </p>
        <br />
        <p>
          Connect with me on <a href="https://www.linkedin.com/in/baileyleavitt/" target="_blank" rel="noreferrer">LinkedIn</a> if you have feedback, questions, or just want to nerd out!
        </p>
        <br />
        <p>
          Check out my <a href="https://github.com/baileyjean/nerdynomad" target="_blank" rel="noreferrer">GitHub repo</a> to see the code base for Nerdy Nomad.
        </p>
        <br />
        <p>
          Check out the <a href="https://trello.com/b/WNPlxFUJ/nerdy-nomad" target="_blank" rel="noreferrer">Trello Board</a> for Nerdy Nomad to see my project management skills (and to see what it looks like to build a fullstack app in 10 days!)
        </p>
      </div>
      <div>
        Thank you for using NERDY NOMAD!
      </div>
      <div>
        <button onClick={() => window.location.assign(`/`)} style={{width: '10em'}}>Return to Home</button>
      </div>
    </div>
  )
}

export default About;