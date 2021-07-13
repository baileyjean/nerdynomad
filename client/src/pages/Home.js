import axios from 'axios'
import { BASE_URL } from '../globals'
import React, { useEffect, useState } from 'react'

const Home = (props) => {
  // const { userID, sciCenters, sciCenterRatings, keyword } = props
  // STATE
  const { userID, loggedIn, sciCenters } = props

  // FUNCTIONS & AXIOS CALLS
  


  // FOR LATER: grab user's location and show science centers near them!
  // const getUserLocation = async () => {
  //   const res = await axios.get(
  //     `${BASE_URL}/users/id/${props.match.params.user_id}`
  //   )
  //   setUserLocation(res.data.location)
  // }

  // useEffect(() => {
  //   getUserLocation()
  // }, [])

  return loggedIn ? (
    <div className="home-user">
      Welcome Home!
    </div>
  ) : (
    <div className="home-no-user">
      Don't Forget to Login!
    </div>
  )
}
export default Home