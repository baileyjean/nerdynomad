import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { Input, Button, Textarea, Select } from 'react-rainbow-components'
import nerdyNomadBadge from '../styles/images/nerdyNomadBadge.png'
import nerdBadge from '../styles/images/nerdRating.png'
import nomadBadge from '../styles/images/nomadRating.png'

const ProfilePage = (props) => {
  //////////////////////// STATE ////////////////////////
  const { userID } = props
  const [user, setUser] = useState({})
  const [editing, setEditing] = useState(false)
  const [nerdyNomadBool, setNerdyNomadBool] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: '',
    location: '',
    bio: '',
    image: '',
    nerdRating: '',
    nomadRating: '',
    nerdyNomad: ''
  })
  const nerdOptions = [
    {value: '0', label: '0'},
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'},
    {value: '5', label: '5+'}
  ]
  const nomadOptions = [
    {value: '1', label: '1-5'},
    {value: '2', label: '6-10'},
    {value: '3', label: '11-15'},
    {value: '4', label: '16-20'},
    {value: '5', label: '21-25'},
    {value: '6', label: '26-30'},
    {value: '7', label: '31-35'},
    {value: '8', label: '36-40'},
    {value: '9', label: '41-45'},
    {value: '10', label: '46+'}
  ]

  //////////////////////// AXIOS CALLS ////////////////////////
  const getUser = async () => {
    const res = await axios.get(`${BASE_URL}/users/id/${userID}`)
    setUser(res.data)
    setEditedUser({
      name: res.data.name,
      username: res.data.username,
      email: res.data.email,
      password: res.data.password,
      location: parseInt(res.data.location),
      bio: res.data.bio,
      image: res.data.image,
      nerdRating: parseInt(res.data.nerdRating),
      nomadRating: parseInt(res.data.nomadRating),
      nerdyNomad: res.data.nerdyNomad
    })
  }

  const submitEditUser = async () => {
    await axios.put(`${BASE_URL}/users/${userID}`, {
      ...editedUser
    })
    setUser({ ...editedUser })
    editProfile()
  }
  
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/users/${userID}`)
      localStorage.removeItem('token')
      localStorage.clear()
      window.location.assign(`/`)
    } catch (error) {
      throw error
    }
  }
  //////////////////////// FUNCTIONS ////////////////////////
  const editProfile = () => {
    if (editing) {
      setEditing(false)
    } else {
      setEditing(true)
    }
  }
  
  const handleNameChange = (e) => {
    setEditedUser({ ...editedUser, name: e.target.value })
  }
  
  const handleBioChange = (e) => {
    setEditedUser({ ...editedUser, bio: e.target.value })
  }
  
  const handleImageChange = (e) => {
    setEditedUser({ ...editedUser, image: e.target.value })
  }
  
  const handleLocationChange = (e) => {
    setEditedUser({ ...editedUser, location: parseInt(e.target.value) })
  }

  const handleNerdChange = (e) => {
    setEditedUser({ ...editedUser, nerdRating: parseInt(e.target.value) })
  }

  const handleNomadChange = (e) => {
    setEditedUser({ ...editedUser, nomadRating: parseInt(e.target.value) })
  }

  //////////////////////// ON-LOAD ////////////////////////
  useEffect(() => {
    getUser()
  }, [])

  //////////////////////// FRONT-END RETURN ////////////////////////
  if (editing) {
    return (
      <div style={{
        padding: '4em',
        margin: '4em' 
      }}>
        <h2>{user.username}'s Profile</h2>
        <img style={{ width: '20vw' }} src={user.image} alt={user.name} />
        <Input
          type="url"
          label="Profile Picture"
          rows={1}
          name={'image'}
          value={editedUser.img}
          onChange={handleImageChange}
          maxLength={255}
          placeholder="Image Link"
          style={{ marginBottom: '40px', width: '25vw' }}
        />
        <Input
          label="Name"
          rows={1}
          name={'name'}
          value={editedUser.name}
          onChange={handleNameChange}
          maxLength={255}
          placeholder="Name"
          style={{ marginBottom: '40px', width: '25vw' }}
        />
        <Textarea
          label="Bio"
          rows={4}
          name={'bio'}
          value={editedUser.bio}
          onChange={handleBioChange}
          maxLength={255}
          placeholder="Tell us about yourself!"
          style={{
            padding: '0.4em',
            width: '50vw',
            marginBottom: '1em',
            overflowY: 'auto'
          }}
        />
        <Input
          label="Zip Code"
          maxLength={5}
          name={'location'}
          value={editedUser.location}
          onChange={handleLocationChange}
          placeholder="Zip Code"
          style={{ marginBottom: '40px', width: '25vw' }}
        />
        <Select
          label="How nerdy are you? Tell us how many science centers/museums you've been to!"
          options={nerdOptions}
          onChange={handleNerdChange}
          required={true}
        />
        <Select
          label="Are you REALLY a nomad? Tell us how many states you've been to!"
          options={nomadOptions}
          onChange={handleNomadChange}
          required={true}
        />
        <Button label="Submit" variant="border" onClick={submitEditUser} />
      </div>
    )
  }

  return(
    <div className="profile">
      <div className="badge-container">
        <div className="profile-badges">
          <img style={{ width: '5em', borderRadius: '0' }} src={nerdBadge} alt={user.name} />
          <div className="text-overlay">
            <h1>{user.nerdRating}</h1>
          </div>
        </div>

        {user.nerdyNomad ? 
          <div className="profile-badges">
            <img style={{ width: '5em', borderRadius: '0' }} src={nerdyNomadBadge} alt={user.name} />
          </div>
        : null
        }
        <div className="profile-badges">
          <img style={{ width: '5em', borderRadius: '0' }} src={nomadBadge} alt={user.name} />
          <div className="text-overlay">
            <h1>{user.nomadRating}</h1>
          </div>
        </div>
      </div>
      <h1>{user.username}'s Profile</h1>
      <div>
        <img style={{ width: '20vw' }} src={user.image} alt={user.name} />
      </div>
      <div>
        <p>Name: {user.name}</p>
        <p>Location: {user.location}</p>
      </div>
      <p>{user.bio}</p>
      <div>
        <button onClick={editProfile} style={{ boxShadow: "1px 1px 4px green" }}>Edit Profile</button>
        <button onClick={() => handleDelete(user.id)} style={{ boxShadow: "1px 1px 4px red"  }}>Delete Profile</button>
      </div>
    </div>
  )
}

export default ProfilePage;