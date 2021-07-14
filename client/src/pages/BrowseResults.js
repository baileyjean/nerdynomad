import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import SciCenterCard from '../components/SciCenterCard'
    
const BrowseResults = (props) => {
  // STATE
  const { userID, loggedIn, history } = props
  const [sciCenters, setSciCenters] = useState([])
  const [sciCenterRatings, setSciCenterRatings] = useState([])

  // FUNCTIONS / AXIOS
  const populateSciCenters = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters`)
    setSciCenters(res.data)
  }

  useEffect(() => {
    populateSciCenters()
  }, [])

  return(
    <div className="sciCenters">
      {sciCenters.map((sciCenter) => (
        <SciCenterCard
          {...props}
          history={history}
          id={sciCenter.id}
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
  )
}