import '../styles/App.css'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../styles/images/nerdyNomad-smol-logoProto4.png'

const NavBar = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, logOut, userID } = props

  const openNav = () => {
    document.getElementById("side-nav").style.width = "250px";
    document.getElementById("open-nav").style.marginLeft = "250px";
  }

  const closeNav = () => {
    document.getElementById("side-nav").style.width = "0";
    document.getElementById("open-nav").style.marginLeft = "0";
  }

  //////////////////////// FRONT-END RETURN ////////////////////////
  return loggedIn ? (
    <div>
      <span id="open-nav" style={{ cursor: 'pointer', fontSize: '24px', padding: '1em' }} onClick={openNav}>&#9776;</span>
      <div id="side-nav" class="nav">
        <button class="close-nav" onClick={closeNav}>x</button>
        <img src={logo} alt={"Nerdy Nomad Logo"} style={{ maxWidth: '100%', height: 'auto' }} />
        <nav>
          <span><NavLink style={{ textDecoration: 'none', color: 'white' }} to={"/"}>Home</NavLink></span>
          <span><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/browse-all">Browse Science Centers</NavLink></span>
          <span><NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/post-science-center/${userID}`}>Add a Science Center</NavLink></span>
          <span><NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/user/${userID}`}>Your Profile </NavLink></span>
          <span><button id="logout" onClick={logOut} style={{ cursor: 'pointer', backgroundColor: 'white', color: 'darkblue', border: 'none', borderRadius: '8px' }}>Log Out</button></span>
        </nav>
      </div>
    </div>
  ) : (
    <div>
      <span id="open-nav" style={{ cursor: "pointer" }} onClick={openNav}>&#9776;</span>
      <div id="side-nav" class="nav">
        <button class="close-nav" onClick={closeNav}>X</button>
        <img src={logo} alt={"Nerdy Nomad Logo"} style={{ width: '100%' }} />
        <nav>
          <span><NavLink style={{ textDecoration: 'none', color: 'white' }} to={"/"}>Home</NavLink></span>
          <span><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/browse-all">Browse Science Centers</NavLink></span>
          <span><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/oneofus">Login/Signup</NavLink></span>
        </nav>
      </div>
    </div>
  )
}
export default NavBar;
