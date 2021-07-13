import React from 'react'
import { NavLink } from 'react-router-dom'
// import logo from '../styles/images/<logohere>'

const NavBar = (props) => {
  const { loggedIn, logOut, userID } = props

  return loggedIn ? (
    <header>
      <NavLink to={"/"}>Home</NavLink>
      {/* Add Smol Logo */}
      <nav>
        <NavLink to="/browse-all">Browse Science Centers</NavLink>
        <NavLink to={`/new-science-center/${userID}`}>Add a Science Center</NavLink>
        <NavLink to={`/user/${userID}`}>Your Profile </NavLink>
        <button id="logout" onClick={logOut}> Logout </button>
      </nav>
    </header>
  ) : (
    <header>
      <NavLink to={"/"}>Home</NavLink>
      {/* Add Smol Logo */}
      <nav>
        <NavLink to="/browse-all">Browse Science Centers</NavLink>
        <NavLink to="/oneofus">Login/Signup</NavLink>
      </nav>
    </header>
  )
}
export default NavBar
