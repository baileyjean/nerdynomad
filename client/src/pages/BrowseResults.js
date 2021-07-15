import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import SciCenterCard from '../components/SciCenterCard'
    
const BrowseResults = (props) => {
  // STATE
  const { sciCenters, history } = props
  const [sciCenterRatings, setSciCenterRatings] = useState([])

  // FUNCTIONS / AXIOS CALLS
  
  console.log(sciCenters)
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

export default BrowseResults;