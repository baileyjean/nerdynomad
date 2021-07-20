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
import SearchByState from './pages/SearchByState'
import SearchResults from './pages/SearchResults'

function App() {
  //////////////////////// STATE ////////////////////////
  const [loggedIn, setLogIn] = useState(false)
  const [userID, setUserID] = useState('')
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const [queriedSciCenters, setQueriedSciCenters] = useState([])
  const unitedStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
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
    "Wyoming",
    "DC"
  ]
  const nerdOptions = [
    {value: '0', label: '0'},
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'},
    {value: '5', label: '5+'}
  ]
  const nomadOptions = [
    {value: '1', label: '1-5'},
    {value: '2', label: '6-10'},
    {value: '3', label: '11-15'},
    {value: '4', label: '16-20'},
    {value: '5', label: '21-25'},
    {value: '6', label: '26-30'},
    {value: '7', label: '31-35'},
    {value: '8', label: '36-40'},
    {value: '9', label: '41-45'},
    {value: '10', label: '46+'}
  ]

  //////////////////////// AUTHENTICATION ////////////////////////
  const logOut = () => {
    setUserID('')
    setLogIn(false)
    localStorage.clear()
    history.push('/')
  }
  
  const getToken = async() => {
    let token = localStorage.getItem('token')
    if (token) {
      const res = await axios.get(`${BASE_URL}/auth/session`)
      setUserID(res.data.id)
      return setLogIn(true)
    }
  }
  
  //////////////////////// FUNCTIONS & AXIOS CALLS ////////////////////////
  const handleSearch = async (e) => {
    e.preventDefault()
    const res = await axios.get(`${BASE_URL}/scicenters/searchby/${keyword}`)
    setQueriedSciCenters(res.data)
    history.push(`/results/${keyword}`)
    setKeyword('')
  }

  const handleChange = (e) => {
    let content = e.target.value
    setKeyword(`${content}`)
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    getToken();
  }, [loggedIn])

  //////////////////////// FRONT-END RETURN ////////////////////////
  return (
    <div className="App">
      <Nav 
        loggedIn={loggedIn}
        userID={userID}
        setUserID={setUserID}
        logOut={logOut}
        />
      <Switch>
        <Route
          exact path="/"
          render={(props) => (
            <Home
              {...props}
              history={history}
              userID={userID}
              loggedIn={loggedIn}
              unitedStates={unitedStates}
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
              handleChange={handleChange}
            />
          )}
        />
        <Route  
          path="/oneofus"
          render={(props) => (
            <SignUpOrIn
              {...props}
              history={history}
              setLogIn={setLogIn}
              setUserID={setUserID}
              nerdOptions={nerdOptions}
              nomadOptions={nomadOptions}
            />
          )}
        />
        <Route
          path="/user/:user_id"
          render={(props) => (
            <Profile 
              {...props} 
              loggedIn={loggedIn} 
              userID={userID}
              nerdOptions={nerdOptions}
              nomadOptions={nomadOptions}
            />
          )}
        />
        <Route 
          path="/science-center/:scicenter_id"
          render={(props) => (
            <SciCenter 
              {...props}
              history={history}
              userID={userID}
              unitedStates={unitedStates}
            />
          )}
        />
        <Route 
          path="/browse-all"
          render={(props) => (
            <BrowseResults 
              {...props}
              history={history}
              userID={userID}
            />
          )}
        />
        <Route 
          path="/results/:query"
          render={(props) => (
            <SearchResults 
              {...props}
              history={history}
              userID={userID}
              queriedSciCenters={queriedSciCenters}
            />
          )}
        />
        <Route 
          path="/location/:location"
          render={(props) => (
            <SearchByState
              {...props}
              history={history}
              userID={userID}
            />
          )}
        />
        <Route 
          path="/post-science-center"
          render={(props) => (
            <PostSciCenter 
              {...props}
              history={history}
              userID={userID}
              unitedStates={unitedStates}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App