import React from 'react'
import SciCenterCard from '../components/SciCenterCard'

const SearchResults = (props) => {
  //////////////////////// STATE ////////////////////////
  const { history, queriedSciCenters } = props
  
  //////////////////////// FRONT-END RETURN ////////////////////////
  return(
    <div className="sciCenter-container">
      <header>
        Nerdy Nomad
      </header>
      <button onClick={() => window.location.assign(`/`)}>Back</button>
      <div className="sciCenters">
      {queriedSciCenters.map((sciCenter) => (
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

export default SearchResults;