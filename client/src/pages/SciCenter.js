import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

////////////////////////////// TO DO LIST ////////////////////////////////
// 1) Add RATINGS and COMMENTS
////////////////////////////// TO DO LIST ////////////////////////////////

const SciCenter = (props) => {
  // STATE
  const { sciCenters, history, userID } = props
  const [sciCenter, setSciCenter] = useState({})
  const id = parseInt(props.match.params.scicenter_id)

  // FUNCTIONS & AXIOS CALLS
  const getSciCenterById = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/scicenter/${id}`)
    setSciCenter(res.data)
  }

  const deleteSciCenter = async () => {
    await axios.delete(`${BASE_URL}/scicenters/${id}`)
    history.push('/')
  }

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////

  // ON LOAD
  useEffect(() => {
    getSciCenterById()
  }, [])

  return (
    <div className="sciCenter-page">
      <img src={sciCenter.image} />
      <h1>{sciCenter.name}</h1>
      <div className="details">
        <div>
          {sciCenter.street}
          {sciCenter.city}
          {sciCenter.state}, {sciCenter.zip}
          {sciCenter.website}
          {sciCenter.priceRange}
          {sciCenter.description}
        </div>
      </div>
      <div
        className="scicenter-buttons"
        onClick={() => history.push(`/scicenters/scicenter_op/${sciCenter.user_id}`)}
      >
        This nerd is active! Check out their other posts!
      </div>
      <div
        style={{ marginBottom: '10vh' }}
        className="scicenter-buttons"
        onClick={deleteSciCenter}
      >
        Did this Science Center close? Please update by deleting.
      </div>
    </div>
  )
}

export default SciCenter