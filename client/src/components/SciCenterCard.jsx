import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const SciCenterCard = (props) => {
  //////////////////////// STATE ////////////////////////
  const { targetSciCenter, setTargetSciCenter } = useState([])

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const getSciCenterInfo = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/scicenter/${props.match.params.id}`)
    setTargetSciCenter(res.data)
  }

  // useEffect(() => {
  //   getSciCenterInfo();
  // }, [])

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  console.log(targetSciCenter)
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return (
    <div className="scicenter-card">
      <img src={props.image} style={{ width: '60%' }} />
      <h3>{props.name}</h3>
      <p>{props.priceRange}</p>
      <p>Address: {props.street}, {props.city}, {props.state}, {props.zip}</p>
      <p>Website: {props.website}</p>
      <p>Description: {props.description}</p>
      <button onClick={() => {
        props.history.push(`/science-center/${props.id}`)

      }}><span>Check It Out</span></button>
    </div>
  )
}

export default SciCenterCard