import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'
import SciCenterCard from '../components/SciCenterCard'

const SearchByState = (props) => {
  //////////////////////// STATE ////////////////////////
  const { history } = props
  const [sciCentersByState, setSciCentersByState] = useState([])
  
  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const searchByState = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters${history.location.pathname}`)
    setSciCentersByState(res.data)
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    searchByState();
  }, [])

  //////////////////////// FRONT-END RETURN ////////////////////////
  return(
    <div className="sciCenter-container">
      <header>
        Nerdy Nomad
      </header>
      <button onClick={() => window.location.assign(`/`)}>Back</button>
      <div className="sciCenters">
      {sciCentersByState.map((sciCenter) => (
        <SciCenterCard
          {...props}
          history={history}
          key={sciCenter.id}
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