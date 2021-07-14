import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'

const Home = (props) => {
  // const { userID, sciCenters, sciCenterRatings, keyword } = props
  // STATE
  const { userID, loggedIn, history } = props
  const [keyword, setKeyword] = useState('')
  const [sciCenters, setSciCenters] = useState([])
  const [sciCenterRatings, setSciCenterRatings] = useState([])
  const unitedStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "DC",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ]
  
  console.log(sciCenters)

  // FUNCTIONS & AXIOS CALLS
  const handleSearch = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/searchby/${keyword}`)
    setSciCenters(res.data)
    history.push(`/results/${keyword}`)
    setKeyword('')
  }

    const handleChange = (e) => {
      let content = e.target.value
      console.log(content)
      setKeyword(`${content}`)
    }

  // FOR LATER: grab user's location and show science centers near them!
  // const getUserLocation = async () => {
  //   const res = await axios.get(
  //     `${BASE_URL}/users/id/${props.match.params.user_id}`
  //   )
  //   setUserLocation(res.data.location)
  // }

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