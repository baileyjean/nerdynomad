import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

////////////////////////////// TO DO LIST ////////////////////////////////
// 1) Add RATINGS and COMMENTS
// 2) CONDITIONAL RENDERING: check userID against sciCenter's user_id
                          // if they match, then show the editing stuff
                          // if they do not match, show the OP profile link
////////////////////////////// TO DO LIST ////////////////////////////////

const SciCenter = (props) => {
  // STATE
  const { history, userID } = props
  const [sciCenter, setSciCenter] = useState({})
  const [editing, setEditing] = useState(false)
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

  const editSciCenter = () => {
    if (editing) {
      setEditing(false)
    } else {
      setEditing(true)
    }
  }

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////

  // ON LOAD
  useEffect(() => {
    getSciCenterById()
  }, [])

  
  if(parseInt(userID) === parseInt(sciCenter.user_id)) {
    return (
      <div className="sciCenter-page">
        <img src={sciCenter.image} />
        <h2>{sciCenter.name}</h2>
        <div className="details">
          <div>
            <p>Price Range: {sciCenter.priceRange}</p>
            <p>{sciCenter.description}</p>
            <p>{sciCenter.website}</p>
            <p>{sciCenter.street}, {sciCenter.city}, {sciCenter.state}, {sciCenter.zip}</p>
          </div>
        </div>
        <div>
          <p><button onClick={editSciCenter} style={{ backgroundColor: 'green', margin: "1em", color: "white" }}>Edit Posting</button></p>
          <p>Did this Science Center close? Please update our database... <button onClick={() => deleteSciCenter} style={{ backgroundColor: 'maroon', margin: "1em", color: "white"  }}>Delete This Science Center</button></p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="sciCenter-page">
        <img src={sciCenter.image} />
        <h2>{sciCenter.name}</h2>
        <div className="details">
          <div>
            <p>Price Range: {sciCenter.priceRange}</p>
            <p>{sciCenter.description}</p>
            <p>{sciCenter.website}</p>
            <p>{sciCenter.street}, {sciCenter.city}, {sciCenter.state}, {sciCenter.zip}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SciCenter