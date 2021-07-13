import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const SciCenter = (props) => {
  const [sciCenter, setSciCenter] = useState({})
  const getSciCenterInfo = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/scicenter/${props.match.params.id}`)
    setSciCenter(res.data)
  }

  const deleteSciCenter = async () => {
    await axios.delete(`${BASE_URL}/scicenters/${props.match.params.id}`)
    props.history.push('/')
  }

  useEffect(() => {
    getSciCenterInfo()
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
        onClick={() => props.history.push(`/scicenters/scicenter_op/${sciCenter.user_id}`)}
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