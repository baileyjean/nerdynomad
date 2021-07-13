import React from 'react'
import { NavLink } from 'react-router-dom'
// import logo from '../styles/images/<logohere>'

const NavBar = (props) => {
  const {
    // loggedIn,
    // logOut,
    userID
  } = props

  console.log(props)
  return (
    <header>
      <NavLink to={`/home/${userID}`}>
        <img src={logo} alt="logo" height="80" />
      </NavLink>
      <nav>
        <NavLink to="/browse">Browse Science Centers</NavLink>
        <NavLink to={`/new-scicenter/${userID}`}>Add a Science Center</NavLink>
        {/* ADD CONDITIONAL RENDERING FOR PROFILE BUTTON - {loggedIn ? <YourProfileButton> : <signinButton>} */}
        {/* <NavLink to={`/user-profile/${userID}`}>Your Profile</NavLink> */}
        {/* ADD CONDITIONAL RENDERING FOR LOGOUT BUTTON - {loggedIn ? <logoutButton> : <signupButton>} */}
        {/* <button id="logout" onClick={logOut}>
          Logout
        </button> */}
      </nav>
    </header>
  )
}
export default NavBar
