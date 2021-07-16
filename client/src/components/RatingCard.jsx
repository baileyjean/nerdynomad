import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const RatingCard = (props) => {
  //////////////////////// STATE ////////////////////////
  const { userID, id, ratings } = props
  const [editing, setEditing] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [totalRating, setTotalRating] = useState()
  const [numRatings, setNumRatings] = useState()
  const [avgRating, setAvgRating] = useState()

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const handleSubmit = async () => {
    await axios.put(`${BASE_URL}/ratings/${props.id}`, {
      user_id: userID,
      scicenter_id: id,
      stars: newRating
    })
  }

  const handleClick = async (int) => {
    setNewRating(int)
  }

  const ratingTotal = () => {
    let ratingTotal = 0
    ratings.forEach(function (rating) {
      ratingTotal += parseInt(rating.stars)
    })
    setTotalRating(ratingTotal)
  }

  const possibleRating = () => {
    let ratingCount = 0
    ratings.forEach(function (rating) {
      ratingCount += 1
    })
    setNumRatings(ratingCount)
  }

  const averageRating = async () => {
    ratingTotal()
    possibleRating()
    setAvgRating(parseInt(totalRating / numRatings))
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    // ratingTotal();
    // possibleRating();
    averageRating();
  }, [])

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return (
    <div>
      <h4>RATING:</h4><p> &#128300; ({totalRating})</p>
      <h5>Rate This Science Center:</h5>
      <span onClick={() => handleClick(1)}>&#128300;</span>
      <span onClick={() => handleClick(2)}>&#128300;</span>
      <span onClick={() => handleClick(3)}>&#128300;</span>
      <span onClick={() => handleClick(4)}>&#128300;</span>
      <span onClick={() => handleClick(5)}>&#128300;</span>
      <br />

      <button style={{ display: `${newRating != 0 ? 'flex' : 'none'}` }} onClick={handleSubmit}>Submit Rating</button>
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