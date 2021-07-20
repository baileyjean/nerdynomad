import React from 'react'

const Home = (props) => {
  //////////////////////// STATE ////////////////////////
  const { loggedIn, history, unitedStates, keyword, handleChange, handleSearch } = props
  
  //////////////////////// FRONT-END RETURN ////////////////////////
  return loggedIn ? (
    <div className="home">
      <header>
        Nerdy Nomad
      </header>
      <div className="searchbar">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search Science Centers"
            value={keyword}
            onChange={handleChange}
          />
          <button>Nerd Out</button>
        </form>
      </div>
      <h3>Where Are We Going Today, Nerdy Nomad?</h3>
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
      <header>
        Nerdy Nomad
      </header>
      <div className="searchbar">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search Science Centers"
            value={keyword}
            onChange={handleChange}
          />
        <button>Nerd Out</button>
        </form>
      </div>
      <h3>Login to Get the Full Experience!</h3>
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