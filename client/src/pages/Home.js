import React from 'react'

const Home = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, history, unitedStates, keyword, handleChange, handleSearch } = props
  
  //////////////////////// FRONT-END RETURN ////////////////////////
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
      <div className="browse-by-state">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
          }>
            <h3>{unitedstate}</h3>
          </div>
        ))}
      </div>
      <div className="browse-by-state">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
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
      <div className="search-by-state">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" id={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
          }>
            <h3>{unitedstate}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home;