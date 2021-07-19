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
  const [posted, setPosted] = useState(false)
  const [alreadyRated, setAlreadyRated] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [avgRating, setAvgRating] = useState()

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const handleSubmit = async () => {
    await axios.post(`${BASE_URL}/ratings`, {
      user_id: userID,
      scicenter_id: id,
      stars: newRating
    })
    setPosted(true)
  }

  const handleClick = (int) => {
    setNewRating(int)
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    const averageRating = () => {
      let ratingTotal = 0
      ratings.forEach(function (rating) {
        ratingTotal += parseInt(rating.stars)
        if (parseInt(rating.user_id) === parseInt(userID)) {
          setAlreadyRated(true)
        }
      })
      if (ratings.length) {
        setAvgRating(ratingTotal / ratings.length)
      } else {
        setAvgRating(parseInt(0))
      }
    }
    averageRating();
  }, [ratings, userID])

  //////////////////////// FRONT-END RETURN ////////////////////////
  return (
    <div>
      <div style={{ display: `${avgRating !== 0 ? 'flex' : 'none'}` }}>
        <h4>RATING:</h4><p> &#128300; {avgRating}/5 ({ratings.length} ratings)</p>
        <br />
      </div>
      <div style={{ display: `${avgRating === 0 ? 'flex' : 'none'}` }}>
        <h5>Be the first to rate this science center:</h5>
      </div>
      {!alreadyRated ?
        <div>
          <span onClick={() => handleClick(1)}>&#128300;</span>
          <span onClick={() => handleClick(2)}>&#128300;</span>
          <span onClick={() => handleClick(3)}>&#128300;</span>
          <span onClick={() => handleClick(4)}>&#128300;</span>
          <span onClick={() => handleClick(5)}>&#128300;</span>
          <br />
          <button onClick={handleSubmit}>Submit Rating</button>
        </div>
        : null}
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
export default RatingCard;