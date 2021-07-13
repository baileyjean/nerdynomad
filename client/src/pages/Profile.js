import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { Input, Button, Textarea } from 'react-rainbow-components'

const ProfilePage = (props) => {
  const { userID } = props
  const [user, setUser] = useState({})
  const [editing, setEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: '',
    location: '',
    bio: '',
    image: ''
  })

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
      image: res.data.image
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  return(
    <div>User Profile</div>
  )
}

export default ProfilePage