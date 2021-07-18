import React from 'react'
import SciCenterCard from '../components/SciCenterCard'

const SearchResults = (props) => {
  //////////////////////// STATE ////////////////////////
  const { history, queriedSciCenters } = props
  
  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////

  //////////////////////// ON-LOAD ////////////////////////
  // useEffect(() => {
  //   searchByState();
  // }, [])
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  console.log(props)
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return(
    <div>
      <div className="sciCenters">
      {queriedSciCenters.map((sciCenter) => (
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

export default SearchResults;