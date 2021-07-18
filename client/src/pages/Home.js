import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'
import SearchResults from './SearchResults'
import SearchByState from './SearchByState'
import SciCenterCard from '../components/SciCenterCard'

const Home = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, history, unitedStates } = props
  const [keyword, setKeyword] = useState('')
  const [queriedSciCenters, setQueriedSciCenters] = useState([])

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////

  const handleSearch = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/searchby/${keyword}`)
    setQueriedSciCenters(res.data)
    history.push(`/results/${keyword}`)
    setKeyword('')
  }

  const handleChange = (e) => {
    let content = e.target.value
    setKeyword(`${content}`)
  }

  // const searchByState = async (location) => {
  //   const res = await axios.get(`${BASE_URL}/scicenters/location/${location}`)
  //   setQueriedSciCenters(res.data)
  //   history.push(`/results/${location}`)
  // }

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
        <SearchResults 
          {...props}
          queriedSciCenters={queriedSciCenters} 
        />
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
            history.push(`/search-by-state/${unitedstate}`)
          }>
            <h3>{unitedstate}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home