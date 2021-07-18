import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  Input,
  Button,
  Textarea,
  Select,
  Notification,
  RenderIf
} from 'react-rainbow-components'

const PostSciCenter = (props) => {
  //////////////////////// STATE ////////////////////////
  const { userID, unitedStates } = props
  const [posted, setPosted] = useState(false)
  const [newSciCenter, setNewSciCenter] = useState({
    user_id: parseInt(userID),
    name: '',
    state: '',
    street: '',
    city: '',
    zip: '',
    website: '',
    priceRange: 'free/donation',
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

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const submitNewSciCenter = async () => {
    await axios.post(`${BASE_URL}/scicenters`, {
      ...newSciCenter
    })
    setPosted(true)
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
    setNewSciCenter({ ...newSciCenter, zip: (e.target.value).toString() })
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

  //////////////////////// FRONT-END RETURN ////////////////////////
  return (
    <div>
    <h3>ADD A NEW SCIENCE CENTER</h3>
    <Input
      label="Science Center Name?"
      rows={1}
      name={'name'}
      value={newSciCenter.name}
      onChange={handleNameChange}
      maxLength={255}
      placeholder="Science Center Name"
      required={true}
    />
    <h3>NAVIGATION DETAILS</h3>
    <Input
      label="Street Address?"
      maxLength={155}
      name={'street'}
      value={newSciCenter.street}
      onChange={handleStreetChange}
      placeholder="Street Address"
    />
    <Input
      label="City?"
      maxLength={155}
      name={'city'}
      value={newSciCenter.city}
      onChange={handleCityChange}
      placeholder="City"
      required={true}
    />
    <Select
      label="State?"
      options={stateOptions}
      onChange={handleStateChange}
      required={true}
    />
    <Input
      label="Zip Code?"
      maxLength={5}
      name={'zip'}
      value={newSciCenter.zip}
      onChange={handleZipChange}
      placeholder="Zip Code"
      required={true}
    />
    
    <h3>NERDY DETAILS</h3>
    <Input
      type="url"
      label="Photo?"
      rows={1}
      name={'image'}
      value={newSciCenter.image}
      onChange={handleImageChange}
      maxLength={255}
      placeholder="Link to an Image of this science center"
    />
    <Select
      label="Price Range?"
      options={priceRangeOptions}
      onChange={handlePriceRangeChange}
      required={true}
    />
    <Input
      type="url"
      label="Website?"
      rows={1}
      name={'website'}
      value={newSciCenter.website}
      onChange={handleWebsiteChange}
      maxLength={255}
      placeholder="Link to this science center's website"
    />
    <Textarea
      label="Description?"
      rows={4}
      name={'description'}
      value={newSciCenter.description}
      onChange={handleDescriptionChange}
      maxLength={1000}
      placeholder="Give us the highlights of this science center!"
    />
    <Button label="Submit" variant="border" onClick={submitNewSciCenter} />

    <RenderIf isTrue={posted}>
      <div>
        <Notification
          title="Success!! Thank you for adding another science center to our database!"
          description="Close this notification to return to the home screen."
          onRequestClose={() => {
            window.location.assign(`/`)
          }}
          icon="success"
        />
      </div>
    </RenderIf>
  </div>
  )
}

export default PostSciCenter;