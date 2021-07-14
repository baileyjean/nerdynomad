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
import PostSciCenter from './pages/PostSciCenter'

function App() {
  // STATE
  const [loggedIn, setLogIn] = useState(false)
  const [userID, setUserID] = useState('')
  const [sciCenters, setSciCenters] = useState([])
  const history = useHistory()
  const unitedStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "DC",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ]

  // AUTHENTICATION
  const logOut = () => {
      setLogIn(false)
      localStorage.clear()
      history.push('/')
    }
  
  const getToken = async(token) => {
    if (token) {
      const res = await axios.get(`${BASE_URL}/auth/session`)
      setUserID(res.data.id)
      return setLogIn(true)
    }
  }
  
  // FUNCTIONS & AXIOS CALLS
  const populateSciCenters = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters`)
    setSciCenters(res.data)
  }

  // ON-LOAD
  useEffect(() => {
    populateSciCenters();
    getToken();
  }, [])

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  console.log(userID)
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////

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
              sciCenters={sciCenters}
              unitedStates={unitedStates}
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
            <Profile 
              {...props} 
              loggedIn={loggedIn} 
              userID={userID} 
            />
          )}
        />
        <Route 
          path="/science-center/:scicenter_id"
          component={(props) => (
            <SciCenter 
              {...props}
              history={history}
              userID={userID}
              sciCenters={sciCenters}
            />
          )}
        />
        <Route 
          path="/browse-all"
          component={(props) => (
            <BrowseResults 
              {...props}
              history={history}
              userID={userID}
              sciCenters={sciCenters}
            />
          )}
        />
        <Route 
          path="/post-science-center"
          component={(props) => (
            <PostSciCenter 
              {...props}
              history={history}
              userID={userID}
              sciCenters={sciCenters}
              unitedStates={unitedStates}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
