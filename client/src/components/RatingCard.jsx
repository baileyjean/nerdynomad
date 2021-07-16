import { React, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const RatingCard = (props) => {
  //////////////////////// STATE ////////////////////////
  const [editing, setEditing] = useState(false)
  const [rating, setRating] = useState()

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////

  const handleClick = async (int) => {
    await axios.put(`${BASE_URL}/ratings/${props.id}`, {
      user_id: props.userID,
      scicenter_id: props.id,
      stars: parseInt(int)
    })
    setRating(parseInt(int))
  }
  // const editComment = () => {
  //   if (editing) {
  //     setEditing(false)
  //   } else {
  //     setEditing(true)
  //   }
  // }

  // handleChange = () => {
  //   const res = await axios.create(`${BASE_URL}/ratings/`)
  // }

  // if (editing) {
  //   return (
  //     <div>
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>

  //         {/* <Rating
  //           label="science-center-rating"
  //         /> */}
  //         <button>Submit</button>

  //       </div>
  //     </div>
  //   )
  // }
  console.log(props.id)
  console.log(props.userID)
  return (
    <div>
      <span onClick={handleClick(1)}>&#128300;</span>
      <span onClick={handleClick(2)}>&#128300;</span>
      <span onClick={handleClick(3)}>&#128300;</span>
      <span onClick={handleClick(4)}>&#128300;</span>
      <span onClick={handleClick(5)}>&#128300;</span>
      {/* <div
        style={{ display: `${props.user_id === props.userID ? 'flex' : 'none'}` }}
      >
        <button>conditionally rendered</button>
        <button onClick={editComment}>Edit</button>
        <button onClick={() => props.handleDelete(props.id)}>delete</button>
      </div> */}
    </div>
  )
}
export default RatingCard