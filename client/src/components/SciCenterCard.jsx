import React from 'react'

const SciCenterCard = (props) => {
  //////////////////////// FRONT-END RETURN ////////////////////////
  return (
    <div className="scicenter-card" onClick={() => {
      props.history.push(`/science-center/${props.id}`)
    }}>
      {props.image ?
        <img src={props.image} alt="" />
        : <img src="https://i.imgur.com/pmSlYJ6.png" alt="" />
      }
      <h4>{props.name}</h4>
      <p>{props.city}, {props.state}</p>
    </div>
  )
}

export default SciCenterCard;