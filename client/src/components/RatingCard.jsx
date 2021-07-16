import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  Notification,
  RenderIf
} from 'react-rainbow-components'

const RatingCard = (props) => {
  //////////////////////// STATE ////////////////////////
  const { userID, id, ratings } = props
  const [editing, setEditing] = useState(false)
  const [posted, setPosted] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [totalRating, setTotalRating] = useState()
  const [numRatings, setNumRatings] = useState()
  const [avgRating, setAvgRating] = useState()

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const handleSubmit = async () => {
    console.log('handleSubmit clicked')
    await axios.post(`${BASE_URL}/ratings`, {
      user_id: userID,
      scicenter_id: id,
      stars: newRating
    })
    setPosted(true)
  }

  // const handleDelete = async (comment_id) => {
  //   await axios.delete(`${BASE_URL}/comments/${comment_id}`)
  //   let currentComments = [...comments].filter((comment) => comment.id !== comment_id)
  //   setComments(currentComments)
  // }

  // const handleChange = (e, index) => {
  //   let currentComments = [...comments]
  //   let target = currentComments[index]
  //   target.post = e.target.value
  //   setComments(currentComments)
  // }

  const handleClick = async (int) => {
    console.log('handleClick clicked')
    setNewRating(int)
    console.log(newRating)
  }

  const averageRating = () => {
    let ratingTotal = 0
    let ratingCount = 0
    ratings.forEach(function (rating) {
      ratingTotal += parseInt(rating.stars)
      ratingCount += 1
    })
    if (ratingCount > 0) {
      setNumRatings(ratingCount)
      setTotalRating(ratingTotal)
      setAvgRating(parseInt(totalRating) / parseInt(numRatings))
    } else {
      setAvgRating(parseInt(0))
    }
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    averageRating();
    // handleSubmit();
  }, [])

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  return (
    <div>
      <div style={{ display: `${avgRating !== 0 ? 'flex' : 'none'}` }}>
        <h4>RATING:</h4><p> &#128300; {avgRating}/5</p>
        <br />
        <h5>Rate This Science Center:</h5>
      </div>
      <div style={{ display: `${avgRating === 0 ? 'flex' : 'none'}` }}>
        <h5>Be the first to rate this science center:</h5>
      </div>
      <span onClick={() => handleClick(1)}>&#128300;</span>
      <span onClick={() => handleClick(2)}>&#128300;</span>
      <span onClick={() => handleClick(3)}>&#128300;</span>
      <span onClick={() => handleClick(4)}>&#128300;</span>
      <span onClick={() => handleClick(5)}>&#128300;</span>
      <br />
      <button onClick={handleSubmit}>Submit Rating</button>
      {/* <button style={{ display: `${newRating != 0 ? 'flex' : 'none'}` }} onClick={handleSubmit}>Submit Rating</button> */}
      <RenderIf isTrue={posted}>
        <div>
          <Notification
            title="Success!! Thank you for rating!"
            onRequestClose={() => {
              window.location.reload()
            }}
            icon="success"
          />
        </div>
      </RenderIf>
    </div>
  )
}
export default RatingCard