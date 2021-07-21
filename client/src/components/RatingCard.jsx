import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import zeroStars from '../styles/images/zeroStars.png'
import oneStars from '../styles/images/oneStars.png'
import twoStars from '../styles/images/twoStars.png'
import threeStars from '../styles/images/threeStars.png'
import fourStars from '../styles/images/fourStars.png'
import fiveStars from '../styles/images/fiveStars.png'
import singleStar from '../styles/images/singleStar.png'
import singleGoldStar from '../styles/images/singleGoldStar.png'
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
    switch (int) {
      case 1:
        document.getElementById("star1").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        break;
      case 2:
        document.getElementById("star1").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star2").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        break;
      case 3:
        document.getElementById("star1").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star2").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star3").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        break;
      case 4:
        document.getElementById("star1").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star2").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star3").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star4").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        break;
      case 5:
        document.getElementById("star1").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star2").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star3").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star4").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        document.getElementById("star5").innerHTML = `<img src=${singleGoldStar} alt="" style={{ width: '5em', height: 'auto', boxShadow: 'none' }} />`
        break;
      default:
        break;
    }
  }

  const displayRating = () => {
    switch (avgRating) {
      case 1:
        return <img src={oneStars} alt="One star rating" style={{ width: '10em', height: 'auto', boxShadow: 'none' }} />
      case 2:
        return <img src={twoStars} alt="Two star rating" style={{ width: '10em', height: 'auto', boxShadow: 'none' }} />
      case 3:
        return <img src={threeStars} alt="Three star rating" style={{ width: '10em', height: 'auto', boxShadow: 'none' }} />
      case 4:
        return <img src={fourStars} alt="Four star rating" style={{ width: '10em', height: 'auto', boxShadow: 'none' }} />
      case 5:
        return <img src={fiveStars} alt="Five star rating" style={{ width: '10em', height: 'auto', boxShadow: 'none' }} />
      default:
        return <img src={zeroStars} alt="Zero ratings" style={{ width: '10em', height: 'auto', boxShadow: 'none' }} />
    }
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
        setAvgRating(Math.ceil(ratingTotal / ratings.length))
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
        <div>
          {displayRating()}
          <p>{ratings.length} ratings</p>
        </div>
        <br />
      </div>
      {!alreadyRated && userID ?
        <div className="select-ratings">
          <span id="star1" onClick={() => handleClick(1)}><img src={singleStar} alt="rate one star" /></span>
          <span id="star2" onClick={() => handleClick(2)}><img src={singleStar} alt="rate two star" /></span>
          <span id="star3" onClick={() => handleClick(3)}><img src={singleStar} alt="rate three star" /></span>
          <span id="star4" onClick={() => handleClick(4)}><img src={singleStar} alt="rate four star" /></span>
          <span id="star5" onClick={() => handleClick(5)}><img src={singleStar} alt="rate five star" /></span>
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