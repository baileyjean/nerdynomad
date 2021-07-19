import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import SciCenterCard from '../components/SciCenterCard'
    
const BrowseResults = (props) => {
  //////////////////////// STATE ////////////////////////
  const { history } = props
  const [sciCenters, setSciCenters] = useState([])

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const populateSciCenters = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters`)
    setSciCenters(res.data)
  }
  
  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    populateSciCenters();
  }, [])

  //////////////////////// FRONT-END RETURN ////////////////////////
  return(
    <div className="sciCenters">
      {sciCenters.map((sciCenter) => (
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
  )
}

export default BrowseResults;