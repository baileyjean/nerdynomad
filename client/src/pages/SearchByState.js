import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'
import SciCenterCard from '../components/SciCenterCard'

const SearchByState = (props) => {
  //////////////////////// STATE ////////////////////////
  const { history } = props
  const [sciCentersByState, setSciCentersByState] = useState('')
  
  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const searchByState = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters${history.location.pathname}`)
    setSciCentersByState(res.data)
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    searchByState();
  }, [])

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  console.log(sciCentersByState)
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return(
    <div>
      <div className="sciCenters">
      {sciCentersByState.map((sciCenter) => (
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
    </div>
  )
}

export default SearchByState;