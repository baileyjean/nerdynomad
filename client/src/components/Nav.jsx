import '../styles/App.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../styles/images/logo.png'

const NavBar = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, logOut, userID } = props

  //////////////////////// FRONT-END RETURN ////////////////////////
  return loggedIn ? (
    <header className="nav">
      <img src={logo} alt={"Nerdy Nomad Logo"} />
      <NavLink to={"/"}>Home</NavLink>
      <nav>
        <NavLink to="/browse-all">Browse Science Centers</NavLink>
        <NavLink to={`/post-science-center/${userID}`}>Add a Science Center</NavLink>
        <NavLink to={`/user/${userID}`}>Your Profile </NavLink>
        <button id="logout" onClick={logOut}> Logout </button>
      </nav>
    </header>
  ) : (
    <header className="nav">
      <img src={logo} alt={"Nerdy Nomad Logo"} />
      <NavLink to={"/"}>Home</NavLink>
      <nav>
        <NavLink to="/browse-all">Browse Science Centers</NavLink>
        <NavLink to="/oneofus">Login/Signup</NavLink>
      </nav>
    </header>
  )
}
export default NavBar;
