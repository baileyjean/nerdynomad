import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { Input, Button, Textarea, Select } from 'react-rainbow-components'
import nerdyNomadBadge from '../styles/images/nerdyNomadBadge.png'
import nerdBadge from '../styles/images/nerdRating.png'
import nomadBadge from '../styles/images/nomadRating.png'
import userDefault from '../styles/images/userDefault.png'

const ProfilePage = (props) => {
  //////////////////////// STATE ////////////////////////
  const { 
    userID, 
    nerdOptions, 
    nomadOptions
  } = props
  const [user, setUser] = useState({})
  const [editing, setEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: '',
    location: '',
    bio: '',
    image: '',
    nerdRating: '',
    nomadRating: ''
  })

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
      nomadRating: parseInt(res.data.nomadRating)
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
      <div className="profile">
        <header>Nerdy Nomad</header>
        <h2>{user.username}</h2>
        {user.image ?
          <img style={{ width: '20em', boxShadow: "0.5px 1px 5px black" }} src={user.image} alt={user.name} />
          : <img style={{ width: '20em', boxShadow: "0.5px 1px 5px black" }} src={userDefault} alt="default for the lazy user" />
        }
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
        <Button label="Cancel" variant="border" onClick={() => setEditing(false)} />
      </div>
    )
  }

  return(
    <div className="profile">
      <header>Nerdy Nomad</header>
      <h1>{user.username}</h1>
      <div>
        {user.image ?
          <img style={{ width: '20em', boxShadow: "0.5px 1px 5px black" }} src={user.image} alt={user.name} />
          : <img style={{ width: '20em', boxShadow: "0.5px 1px 5px black" }} src={userDefault} alt="default for the lazy user... cooler than the usual default tho" />
        }
      </div>
      <div className="badge-container">
        <div className="profile-badges">
          <img style={{ width: '5em', borderRadius: '0' }} src={nerdBadge} alt={user.name} />
          <div className="text-overlay">
            <h1>{user.nerdRating}</h1>
          </div>
        </div>

        {(user.nerdRating > 3 && user.nomadRating > 5) ? 
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
      <div>
        <p>Name: {user.name}</p>
        <p>{user.name}'s Bio: {user.bio}</p>
      </div>
      <div>
        <button onClick={editProfile} id="editBtn">Edit Profile</button>
        <button onClick={() => handleDelete(user.id)} id="deleteBtn">Delete Profile</button>
      </div>
      <button onClick={() => window.location.assign(`/`)}>Back</button>
    </div>
  )
}

export default ProfilePage;