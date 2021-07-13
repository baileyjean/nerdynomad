import './styles/App.css'
import axios from 'axios'
import { BASE_URL } from './globals'
import { React, useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import BrowseResults from './pages/BrowseResults'



function App() {
  // STATE
  const [loggedIn, setLogIn] = useState(false)
  const [userID, setUserID] = useState('')
  // const [keyword, setKeyword] = useState('')
  const [sciCenters, setSciCenters] = useState([])
  // const [sciCenterRatings, setSciCenterRatings] = useState([])
  const history = useHistory()

  // AUTHENTICATION
  const logOut = () => {
      setLogIn(false)
      localStorage.clear()
      history.push('/')
    }

  // FUNCTIONS
  // const handleSearch = async () => {
  //   const res = await axios.get(`${BASE_URL}/scicenters/searchby/${keyword}`)
  //   setPetPosts(res.data)
  //   history.push(`/results/${keyword}`)
  //   setKeyword('')
  // }

  //   const handleChangeSearch = (e) => {
  //     let content = e.target.value
  //     setKeyword(`${content}`)
  //   }

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
              userID={userID}
              loggedIn={loggedIn}
              sciCenters={sciCenters}
            />
          )}
        />
        <Route  
          path="/login"
          component={(props) => (
            <Login
              {...props}
              history={history}
              setLogIn={setLogIn}
              setUserID={setUserID}
            />
          )}
        />
        <Route
          path="/signup"
          component={(props) => (
            <Signup 
              {...props}
              history={history}
              setUserID={setUserID}
            />)}
        />
        <Route
          path="/user/:user_id"
          component={(props) => (
            <Profile {...props} loggedIn={loggedIn} userID={userID} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
