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
    { display: "Alabama", value: "Alabama" },
    { display: "Alaska", value: "Alaska" },
    { display: "Arizona", value: "Arizona" },
    { display: "Arkansas", value: "Arkansas" },
    { display: "California", value: "California" },
    { display: "Colorado", value: "Colorado" },
    { display: "Connecticut", value: "Connecticut" },
    { display: "Delaware", value: "Delaware" },
    { display: "District of Columbia (DC)", value: "DC" },
    { display: "Florida", value: "Florida" },
    { display: "Georgia", value: "Georgia" },
    { display: "Hawaii", value: "Hawaii" },
    { display: "Idaho", value: "Idaho" },
    { display: "Illinois", value: "Illinois" },
    { display: "Indiana", value: "Indiana" },
    { display: "Iowa", value: "Iowa" },
    { display: "Kansas", value: "Kansas" },
    { display: "Kentucky", value: "Kentucky" },
    { display: "Louisiana", value: "Louisiana" },
    { display: "Maine", value: "Maine" },
    { display: "Maryland", value: "Maryland" },
    { display: "Massachusetts", value: "Massachusetts" },
    { display: "Michigan", value: "Michigan" },
    { display: "Minnesota", value: "Minnesota" },
    { display: "Mississippi", value: "Mississippi" },
    { display: "Missouri", value: "Missouri" },
    { display: "Montana", value: "Montana" },
    { display: "Nebraska", value: "Nebraska" },
    { display: "Nevada", value: "Nevada" },
    { display: "New Hampshire", value: "NewHampshire" },
    { display: "New Jersey", value: "NewJersey" },
    { display: "New Mexico", value: "NewMexico" },
    { display: "New York", value: "NewYork" },
    { display: "North Carolina", value: "NorthCarolina" },
    { display: "North Dakota", value: "NorthDakota" },
    { display: "Ohio", value: "Ohio" },
    { display: "Oklahoma", value: "Oklahoma" },
    { display: "Oregon", value: "Oregon" },
    { display: "Pennsylvania", value: "Pennsylvania" },
    { display: "Rhode Island", value: "Rhode Island" },
    { display: "South Carolina", value: "South Carolina" },
    { display: "South Dakota", value: "SouthDakota" },
    { display: "Tennessee", value: "Tennessee" },
    { display: "Texas", value: "Texas" },
    { display: "Utah", value: "Utah" },
    { display: "Vermont", value: "Vermont" },
    { display: "Virginia", value: "Virginia" },
    { display: "Washington", value: "Washington" },
    { display: "West Virginia", value: "WestVirginia" },
    { display: "Wisconsin", value: "Wisconsin" },
    { display: "Wyoming", value: "Wyoming" }
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
          <div className="unitedStates" id={unitedstate.value} onClick={() =>
            history.push(`/browse-result/${unitedstate.value}`)
          }>
            <h3>{unitedstate.display}</h3>
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
          <div className="unitedStates" id={unitedstate.value} onClick={() =>
            history.push(`/browse-result/${unitedstate.value}`)
          }>
            <h3>{unitedstate.display}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home