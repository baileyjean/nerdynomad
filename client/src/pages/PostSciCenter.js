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
  const [posted, setPosted] = useState(false)
  const [name, setName] = useState('')
  const [sciCenterState, setSciCenterState] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [website, setWebsite] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  // const [newSciCenter, setNewSciCenter] = useState({
  //   user_id: props.userID,
  //   name: '',
  //   state: '',
  //   street: '',
  //   city: '',
  //   zip: '',
  //   website: '',
  //   priceRange: '',
  //   description: '',
  //   image: ''
  // })
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

  ////////////////////// CONSOLE LOGS FOR TESTING //////////////////////
  // console.log(props.userID)
  ////////////////////// CONSOLE LOGS FOR TESTING //////////////////////


  const submitNewSciCenter = async () => {
    await axios.post(`${BASE_URL}/scicenters`, {
      user_id: userID,
      name: name,
      state: sciCenterState,
      street: street,
      city: city,
      zip: zip.toString(),
      website: website,
      priceRange: priceRange,
      description: description,
      image: image
    })
    setPosted(true)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleSciCenterStateChange = (e) => {
    setSciCenterState(e.target.value)
  }

  const handleStreetChange = (e) => {
    setStreet(e.target.value)
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const handleZipChange = (e) => {
    setZip(e.target.value)
  }

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value)
  }

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleImageChange = (e) => {
    setImage(e.target.value)
  }

  return (
    <div>
    <h3>ADD A NEW SCIENCE CENTER</h3>
    <Input
      label="Science Center Name?"
      rows={1}
      name={'name'}
      value={name}
      onChange={handleNameChange}
      maxLength={255}
      placeholder="Science Center Name"
    />
    <h3>NAVIGATION DETAILS</h3>
    <Input
      label="Street Address?"
      maxLength={155}
      name={'street'}
      value={street}
      onChange={handleStreetChange}
      placeholder="Street Address"
    />
    <Input
      label="City?"
      maxLength={155}
      name={'city'}
      value={city}
      onChange={handleCityChange}
      placeholder="City"
    />
    <Select
      label="State?"
      options={stateOptions}
      onChange={handleSciCenterStateChange}
    />
    <Input
      label="Zip Code?"
      maxLength={5}
      name={'zip'}
      value={zip}
      onChange={handleZipChange}
      placeholder="Zip Code"
    />
    
    <h3>NERDY DETAILS</h3>
    <Input
      type="url"
      label="Photo?"
      rows={1}
      name={'image'}
      value={image}
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
      value={website}
      onChange={handleWebsiteChange}
      maxLength={255}
      placeholder="Link to this science center's website"
    />
    <Textarea
      label="Description?"
      rows={4}
      name={'description'}
      value={description}
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
          // hideCloseButton={true}
          onRequestClose={() => {
            history.push(`/`)
          }}
          icon="success"
        />
      </div>
    </RenderIf>
  </div>
  )
}

export default PostSciCenter;