import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'
import SearchResults from './SearchResults'
import SciCenterCard from '../components/SciCenterCard'

const Home = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, history, unitedStates, keyword, handleChange, handleSearch } = props

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////

  //////////////////////// ON-LOAD ////////////////////////
  
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  console.log(props)
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return loggedIn ? (
    <div className="home-user">
      <div className="searchbar">
        <input
          type="search"
          placeholder="Search Science Centers"
          value={keyword}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Nerd Out!</button>
      </div>
      Welcome Home!
      <br />
      <div className="browse-by-state">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
          }>
            <h3>{unitedstate}</h3>
          </div>
        ))}
      </div>
      <div className="browse-by-state">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
          }>
            <h3>{unitedstate}</h3>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="home-no-user">
      <div className="searchbar">
        <input
          type="search"
          placeholder="Search Science Centers"
          value={keyword}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Nerd Out!</button>
      </div>
      Login to Get the Full Experience!
      <br />
      <div className="search-by-state">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
          }>
            <h3>{unitedstate}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home