import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import CommentCard from '../components/CommentCard'
import CommentForm from '../components/CommentForm'
import {
  Input,
  Button,
  Textarea,
  Select
} from 'react-rainbow-components'

const SciCenter = (props) => {
  //////////////////////// STATE ////////////////////////
  const { history, userID, unitedStates } = props
  const id = parseInt(props.match.params.scicenter_id)
  const [sciCenter, setSciCenter] = useState({})
  const [editing, setEditing] = useState(false)
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
  const [comments, setComments] = useState([])

  //////////////////////// SCICENTERS: AXIOS CALLS ////////////////////////
  const getSciCenterById = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/scicenter/${id}`)
    setSciCenter(res.data)
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
    setSciCenter({...editedSciCenter})
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
  const sciCenterComments = async () => {
    const res = await axios.get(`${BASE_URL}/comments/scicenter/${id}`)
    setComments(res.data)
  }

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

  //////////////////////// RATINGS: FUNCTIONS & AXIOS CALLS ////////////////////////
  // const sciCenterComments = async () => {
  //   const res = await axios.get(`${BASE_URL}/comments/scicenter/${id}`)
  //   setComments(res.data)
  // }

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

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    getSciCenterById();
    sciCenterComments();
  }, [])
  
  if (editing) {
    return (
      <div>
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
      <img src={sciCenter.image} />
      <h2>{sciCenter.name}</h2>
      <div className="details">
        <div>
          <p>Price Range: {sciCenter.priceRange}</p>
          <p>{sciCenter.description}</p>
          <p>{sciCenter.website}</p>
          <p>{sciCenter.street}, {sciCenter.city}, {sciCenter.state}, {sciCenter.zip}</p>
        </div>
      </div>
      <div className="comments">
        {comments.map((comment, index) => (
        <div className="comments">
          <CommentCard
            key={`${comment.user_id} ${index}`}
            index={index}
            text={comment.post}
            user_id={comment.user_id}
            scicenter_id={comment.scicenter_id}
            userID={userID}
            id={comment.id}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
        </div>
        ))}
        <CommentForm
          userID={userID}
          id={id}
          sciCenterComments={sciCenterComments}
        />
      </div>
      <div
        style={{ display: `${parseInt(userID) === parseInt(sciCenter.user_id) ? 'flex' : 'none'}` }}
      >
        <p><button onClick={editSciCenter} style={{ backgroundColor: 'green', margin: "1em", color: "white" }}>Edit Posting</button> Did this Science Center close? Please update our database... <button onClick={deleteSciCenter} style={{ backgroundColor: 'maroon', margin: "1em", color: "white"  }}>Delete This Science Center</button></p>
      </div>
    </div>
  )
}

export default SciCenter