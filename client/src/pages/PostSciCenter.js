import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  Input,
  Button,
  Textarea,
  Select,
  Notification,
  RenderIf,
  CounterInput
} from 'react-rainbow-components'

const PostSciCenter = (props) => {
  const { userID, history, unitedStates } = props
  const [sciCenter, setSciCenter] = useState({})
  const [newSciCenter, setNewSciCenter] = useState({
    user_id: parseInt(userID),
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

  const submitNewSciCenter = async () => {
    await axios.put(`${BASE_URL}/scicenters`, {
      ...newSciCenter
    })
    setNewSciCenter({ ...newSciCenter })
  }

  const handleNameChange = (e) => {
    setNewSciCenter({ ...newSciCenter, name: e.target.value })
  }

  const handleStateChange = (e) => {
    setNewSciCenter({ ...newSciCenter, state: e.target.value })
  }

  const handleStreetChange = (e) => {
    setNewSciCenter({ ...newSciCenter, street: e.target.value })
  }

  const handleCityChange = (e) => {
    setNewSciCenter({ ...newSciCenter, city: e.target.value })
  }

  const handleZipChange = (e) => {
    setNewSciCenter({ ...newSciCenter, zip: e.target.value })
  }

  const handleWebsiteChange = (e) => {
    setNewSciCenter({ ...newSciCenter, website: e.target.value })
  }

  const handlePriceRangeChange = (e) => {
    setNewSciCenter({ ...newSciCenter, priceRange: e.target.value })
  }

  const handleDescriptionChange = (e) => {
    setNewSciCenter({ ...newSciCenter, description: e.target.value })
  }

  const handleImageChange = (e) => {
    setNewSciCenter({ ...newSciCenter, image: e.target.value })
  }

  return (
    <div>
    <Input
      type="url"
      label="Science Center Photo"
      rows={1}
      name={'image'}
      value={newSciCenter.image}
      onChange={handleImageChange}
      maxLength={255}
      placeholder="Image Link"
      style={{ marginBottom: '40px', width: '25vw' }}
    />
    <p>Name:</p>
    <Input
      label="Science Center Name"
      rows={1}
      name={'name'}
      value={newSciCenter.name}
      onChange={handleNameChange}
      maxLength={255}
      placeholder="Name"
    />
    <Select
      label="Price Range for this Science Center?"
      options={priceRangeOptions}
      onChange={handlePriceRangeChange}
    />
    <p>Description:</p>
    <Textarea
      label="Description"
      rows={4}
      name={'Description'}
      value={newSciCenter.description}
      onChange={handleDescriptionChange}
      maxLength={1000}
      placeholder="Tell us about this science center!"
    />
    <p>Zip Code:</p>
    <Input
      label="Zip Code"
      maxLength={5}
      name={'location'}
      value={newSciCenter.zip}
      onChange={handleZipChange}
      placeholder="Zip Code"
    />
    <Button label="Submit" variant="border" onClick={submitNewSciCenter} />
  </div>
  )
}

export default PostSciCenter;