import React from 'react'

const SciCenterCard = (props) => {
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return (
    <div className="scicenter-card">
      <img src={props.image} style={{ width: '60%' }} />
      <h3>{props.name}</h3>
      <p>{props.city}, {props.state}</p>
      <button onClick={() => {
        props.history.push(`/science-center/${props.id}`)
      }}><span>Check It Out</span></button>
    </div>
  )
}

export default SciCenterCard