import React from 'react'

const SciCenterCard = (props) => {
  //////////////////////// FRONT-END RETURN ////////////////////////
  return (
    <div className="scicenter-card" onClick={() => {
      props.history.push(`/science-center/${props.id}`)
    }}>
      <img src={props.image} style={{ width: '60%' }} />
      <h4>{props.name}</h4>
      <p>{props.city}, {props.state}</p>
    </div>
  )
}

export default SciCenterCard;