import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'

const Home = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, history, unitedStates } = props
  const [keyword, setKeyword] = useState('')
  const [queriedSciCenters, setQueriedSciCenters] = useState([])
  
  // FOR LATER: grab user's location and show science centers near them!
  // const getUserLocation = async () => {
  //   const res = await axios.get(
  //     `${BASE_URL}/users/id/${props.match.params.user_id}`
  //   )
  //   setUserLocation(res.data.location)
  // }

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

  //////////////////////// ON-LOAD ////////////////////////

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
      <div className="browse-results">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/browse-result/${unitedstate}`)
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
      <div className="browse-results">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/browse-result/${unitedstate}`)
          }>
            <h3>{unitedstate}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home