import React from 'react'

const Home = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, history, unitedStates, keyword, handleChange, handleSearch, userID } = props
  
  //////////////////////// FRONT-END RETURN ////////////////////////
  return loggedIn ? (
    <div className="home">
      <header>
        Nerdy Nomad
      </header>
      <div className="searchbar">
        <input
          type="search"
          placeholder="Search Science Centers"
          value={keyword}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Nerd Out</button>
      </div>
      <h2>Where Are We Going Today, Nerdy Nomad?</h2>
      <br />
      <div className="state-list">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" key={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
          }>
            <p>{unitedstate}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="home">
      <div className="searchbar">
        <input
          type="search"
          placeholder="Search Science Centers"
          value={keyword}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Nerd Out!</button>
      </div>
      <h2>Login to Get the Full Experience!</h2>
      <br />
      <div className="state-list">
        {unitedStates.map((unitedstate) => (
          <div className="unitedStates" key={unitedstate} onClick={() =>
            history.push(`/location/${unitedstate}`)
          }>
            <p>{unitedstate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home;