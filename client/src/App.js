import './styles/App.css'
import axios from 'axios'
import { BASE_URL } from './globals'
import { React, useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import SignUpOrIn from './pages/SignUpOrIn'
import Profile from './pages/Profile'
import BrowseResults from './pages/BrowseResults'
import SciCenter from './pages/SciCenter'



function App() {
  // STATE
  const [loggedIn, setLogIn] = useState(false)
  const [userID, setUserID] = useState('')
  const history = useHistory()
  const [sciCenters, setSciCenters] = useState([])
  const [sciCenterRatings, setSciCenterRatings] = useState([])

  // AUTHENTICATION
  const logOut = () => {
      setLogIn(false)
      localStorage.clear()
      history.push('/')
    }

  return (
    <div className="App">
      <Nav 
        loggedIn={loggedIn}
        userID={userID}
        setUserID={setUserID}
        logOut={logOut}
      />
      <h1>Nerdy Nomad</h1>
      <Switch>
        <Route
          exact path="/"
          component={(props) => (
            <Home
              {...props}
              history={history}
              userID={userID}
              loggedIn={loggedIn}
            />
          )}
        />
        <Route  
          path="/oneofus"
          component={(props) => (
            <SignUpOrIn
              {...props}
              history={history}
              setLogIn={setLogIn}
              setUserID={setUserID}
            />
          )}
        />
        <Route
          path="/user/:user_id"
          component={(props) => (
            <Profile {...props} loggedIn={loggedIn} userID={userID} />
          )}
        />
        <Route 
          path="/science-center/:scicenter_id"
          component={(props) => (
            <SciCenter 
              {...props}
              history={history}
              setUserID={userID}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
