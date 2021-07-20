import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import CommentCard from '../components/CommentCard'
import RatingCard from '../components/RatingCard'
import {
  Input,
  Button,
  Textarea,
  Select
} from 'react-rainbow-components'

const SciCenter = (props) => {
  //////////////////////// STATE ////////////////////////
  const { userID, unitedStates } = props
  const id = parseInt(props.match.params.scicenter_id)
  const [sciCenterComplete, setSciCenterComplete] = useState({})
  const [editing, setEditing] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [ratings, setRatings] = useState([])
  const [editedSciCenter, setEditedSciCenter] = useState({
    name: '',
    state: '',
    street: '',
    city: '',
    zip: '',
    website: '',
    priceRange: '',
    description: '',
    image: ''
  })
  const priceRangeOptions = [
    {value:'free/donation', label: 'free/donation'},
    {value:'$2 - $5', label: '$2 - $5'},
    {value:'$6 - $10', label: '$6 - $10'},
    {value:'$11 - $15', label: '$11 - $15'},
    {value:'$16 - $20', label: '$16 - $20'},
    {value:'$21 - $25', label: '$21 - $25'},
    {value:'$26 - $30', label: '$26 - $30'},
    {value:'$31 - $35', label: '$31 - $35'},
    {value:'$36 - $40', label: '$36 - $40'},
    {value:'$42+ per person', label: '$42+ per person'}
  ]
  const stateOptions = []
  unitedStates.map((unitedState) => (stateOptions.push({value:`${unitedState}`, label:`${unitedState}`})))

  //////////////////////// SCICENTERS: AXIOS CALLS ////////////////////////
  const getSciCenterInfo = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/info/${id}`)
    setSciCenterComplete(res.data)
    setRatings(res.data.Ratings)
    setComments(res.data.Comments)
    setEditedSciCenter({
      name: res.data.name,
      state: res.data.state,
      street: res.data.street,
      city: res.data.city,
      zip: res.data.zip,
      website: res.data.website,
      priceRange: res.data.priceRange,
      description: res.data.description,
      image: res.data.image
    })
  }
  
  const submitEditSciCenter = async () => {
    await axios.put(`${BASE_URL}/scicenters/${id}`, {
      ...editedSciCenter
    })
    setSciCenterComplete({...editedSciCenter})
    editSciCenter()
  }
  
  const deleteSciCenter = async () => {
    try {
      window.location.assign(`/`)
      await axios.delete(`${BASE_URL}/scicenters/${id}`)
    } catch (error) {
      throw(error)
    }
  }

  //////////////////////// SCICENTERS: FUNCTIONS ////////////////////////
  const editSciCenter = () => {
    if (editing) {
      setEditing(false)
    } else {
      setEditing(true)
    }
  }

  const handleNameChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, name: e.target.value })
  }

  const handleStateChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, state: e.target.value })
  }

  const handleStreetChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, street: e.target.value })
  }

  const handleCityChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, city: e.target.value })
  }

  const handleZipChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, zip: (e.target.value).toString() })
  }

  const handleWebsiteChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, website: e.target.value })
  }

  const handlePriceRangeChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, priceRange: e.target.value })
  }

  const handleDescriptionChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, description: e.target.value })
  }

  const handleImageChange = (e) => {
    setEditedSciCenter({ ...editedSciCenter, image: e.target.value })
  }

  //////////////////////// COMMENTS: FUNCTIONS & AXIOS CALLS ////////////////////////
  const handleDelete = async (comment_id) => {
    await axios.delete(`${BASE_URL}/comments/${comment_id}`)
    let currentComments = [...comments].filter((comment) => comment.id !== comment_id)
    setComments(currentComments)
  }

  const handleChange = (e, index) => {
    let currentComments = [...comments]
    let target = currentComments[index]
    target.post = e.target.value
    setComments(currentComments)
  }

  const submitNewComment = async () => {
    await axios.post(`${BASE_URL}/comments`, {
      user_id: userID,
      scicenter_id: id,
      post: newComment
    })
    getSciCenterInfo()
    setNewComment('')
  }

  const handleNewComment = (e) => {
    setNewComment(e.target.value)
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    getSciCenterInfo();
  }, [])

  //////////////////////// FRONT-END RETURN ////////////////////////
  if (editing) {
    return (
      <div className="sciCenter-page">
        <header>
          Nerdy Nomad
        </header>
        <h3>EDIT SCIENCE CENTER</h3>
        <Input
          label="Science Center Name?"
          rows={1}
          name={'name'}
          value={editedSciCenter.name}
          onChange={handleNameChange}
          maxLength={255}
          placeholder="Science Center Name"
        />
        <h3>NAVIGATION DETAILS</h3>
        <Input
          label="Street Address?"
          maxLength={155}
          name={'street'}
          value={editedSciCenter.street}
          onChange={handleStreetChange}
          placeholder="Street Address"
        />
        <Input
          label="City?"
          maxLength={155}
          name={'city'}
          value={editedSciCenter.city}
          onChange={handleCityChange}
          placeholder="City"
        />
        <Select
          label="State?"
          options={stateOptions}
          onChange={handleStateChange}
        />
        <Input
          label="Zip Code?"
          maxLength={5}
          name={'zip'}
          value={editedSciCenter.zip}
          onChange={handleZipChange}
          placeholder="Zip Code"
        />
        <h3>NERDY DETAILS</h3>
          <Input
          type="url"
          label="Photo?"
          rows={1}
          name={'image'}
          value={editedSciCenter.image}
          onChange={handleImageChange}
          maxLength={255}
          placeholder="Link to an Image of this science center"
        />
        <Select
          label="Price Range?"
          options={priceRangeOptions}
          onChange={handlePriceRangeChange}
        />
        <Input
          type="url"
          label="Website?"
          rows={1}
          name={'website'}
          value={editedSciCenter.website}
          onChange={handleWebsiteChange}
          maxLength={255}
          placeholder="Link to this science center's website"
        />
        <Textarea
          label="Description?"
          rows={4}
          name={'description'}
          value={editedSciCenter.description}
          onChange={handleDescriptionChange}
          maxLength={1000}
          placeholder="Give us the highlights of this science center!"
        />
        <Button label="Submit" variant="border" onClick={submitEditSciCenter} />
      </div>
    )
  }
  return (
    <div className="sciCenter-page">
      <header>
        Nerdy Nomad
      </header>
      <h1>{sciCenterComplete.name}</h1>
      <div className="rating-container">
        <RatingCard 
          id={id}
          userID={userID} 
          ratings={ratings}
        />
      </div>
      <div className="sciCenter-details">
        <div className="left-container">
          <p>Price Range: {sciCenterComplete.priceRange}</p>
          <p>{sciCenterComplete.website}</p>
          <p>{sciCenterComplete.street}, {sciCenterComplete.city}, {sciCenterComplete.state}, {sciCenterComplete.zip}</p>
          {sciCenterComplete.description ?
            <div className="about-div">
              <h3>ABOUT</h3>
              <p> {sciCenterComplete.description}</p>
            </div>
            : null
          }
          
          <div style={{ display: `${parseInt(userID) === parseInt(sciCenterComplete.user_id) ? 'inherit' : 'none'}` }}>
            <p>
              Did this Science Center close? Please update our database...
              <button id="editBtn" onClick={editSciCenter}>Edit Posting</button> <button  id="deleteBtn" onClick={deleteSciCenter}>Delete Posting</button>
            </p>
          </div>
        </div>
        <div className="right-container">
          {sciCenterComplete.image ?
            <img src={sciCenterComplete.image} />
            : <img src="https://i.imgur.com/pmSlYJ6.png" alt="default image displays when there are no photos" />
          }
        </div>
      </div>

      <div className="comment-container"> 
        <div className="comments">
          {(sciCenterComplete.Comments.length == 0) ?
              <div>
                <p>Be the First to Comment!</p>
              </div>
          : 
            <div>
              {comments.map((comment, index) => (
                <div className="comment">
                  <CommentCard
                    key={`${comment.user_id} ${index}`}
                    index={index}
                    post={comment.post}
                    user_id={comment.user_id}
                    scicenter_id={comment.scicenter_id}
                    userID={userID}
                    id={comment.id}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
                  />
                </div>
              ))}
            </div>
          } 
        </div>
        {userID ? 
          <form>
            <Textarea
              label="Comment"
              rows={4}
              onChange={handleNewComment}
              maxLength={255}
              placeholder="Tell us your thoughts about this science center!"
              value={newComment}
            />
            <Button label="Submit" variant="border" onClick={submitNewComment} />
          </form>
        : <p className="right-container">Do YOU have an opinion? Of course you do... but we don't care. Unless you LOGIN  ^_^</p>}
      </div>
    </div>
  )
}

export default SciCenter;