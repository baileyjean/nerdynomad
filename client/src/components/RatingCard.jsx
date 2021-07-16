import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const RatingCard = (props) => {
  //////////////////////// STATE ////////////////////////
  const { userID, id, ratings } = props
  const [editing, setEditing] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [totalRating, setTotalRating] = useState(0)
  const [numRatings, setNumRatings] = useState(1)
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
      console.log(ratingTotal)
    })
    if (ratingTotal > 0) {
      setTotalRating(ratingTotal)
    } else {
      setTotalRating(parseInt(0))
    }
  }

  const possibleRating = () => {
    let ratingCount = 0
    ratings.forEach(function (rating) {
      ratingCount += 1
    })
    if (ratingCount > 0) {
      setNumRatings(ratingCount)
    } else {
      setNumRatings(parseInt(1))
    }
  }

  const averageRating = () => {
    ratingTotal();
    possibleRating();
    setAvgRating(parseInt(totalRating) / parseInt(numRatings))
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    averageRating();
  }, [])

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  console.log(`totalRating: ${totalRating}, numRatings: ${numRatings}, avgRating: ${avgRating}`)
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return (
    <div>
      <div>
        <h4>RATING:</h4><p> &#128300; {avgRating}/5</p>
      </div>
      <h5>Rate This Science Center:</h5>
      <span onClick={() => handleClick(1)}>&#128300;</span>
      <span onClick={() => handleClick(2)}>&#128300;</span>
      <span onClick={() => handleClick(3)}>&#128300;</span>
      <span onClick={() => handleClick(4)}>&#128300;</span>
      <span onClick={() => handleClick(5)}>&#128300;</span>
      <br />

      <button style={{ display: `${newRating != 0 ? 'flex' : 'none'}` }} onClick={handleSubmit}>Submit Rating</button>
    </div>
  )
}
export default RatingCard