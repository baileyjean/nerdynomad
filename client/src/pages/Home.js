import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'
import SciCenterCard from '../components/SciCenterCard'

const Home = (props) => {
  // const { userID, sciCenters, sciCenterRatings, keyword } = props
  // STATE
  const { userID, loggedIn, history } = props
  const [keyword, setKeyword] = useState('')
  const [sciCenters, setSciCenters] = useState([])
  const [sciCenterRatings, setSciCenterRatings] = useState([])

  // FUNCTIONS & AXIOS CALLS
  const populateSciCenters = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters`)
    setSciCenters(res.data)
  }

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

  useEffect(() => {
    populateSciCenters()
  }, [])

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
      <div className="sciCenters">
      {sciCenters.map((sciCenter) => (
            <SciCenterCard
              name={sciCenter.name}
              image={sciCenter.image}
              street={sciCenter.street}
              city={sciCenter.city}
              state={sciCenter.state}
              zip={sciCenter.zip}
              website={sciCenter.website}
              priceRange={sciCenter.priceRange}
              description={sciCenter.description}
            />
        ))}
      </div>
      <div>

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
      <div className="sciCenters">
      {sciCenters.map((sciCenter) => (
            <SciCenterCard
              name={sciCenter.name}
              image={sciCenter.image}
              street={sciCenter.street}
              city={sciCenter.city}
              state={sciCenter.state}
              zip={sciCenter.zip}
              website={sciCenter.website}
              priceRange={sciCenter.priceRange}
              description={sciCenter.description}
            />
        ))}
      </div>
    </div>
  )
}
export default Home