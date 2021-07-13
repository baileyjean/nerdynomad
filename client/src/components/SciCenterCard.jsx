import React from 'react'

const SciCenterCard = (props) => {
  return (
    <div className="scicenter-card">
      <img src={props.image} style={{ width: '60%' }} />
      <h3>{props.name}</h3>
      <p>{props.priceRange}</p>
      <p>Address: {props.street}, {props.city}, {props.state}, {props.zip}</p>
      <p>Website: {props.website}</p>
      <p>Description: {props.description}</p>
      <button onClick={() => {
        props.history.push(`/scicenter/${props.id}`)
      }}><span>Check It Out</span></button>
    </div>
  )
}

export default SciCenterCard