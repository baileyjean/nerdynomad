import axios from 'axios'
import { BASE_URL } from '../globals.js'
import React, { useState, useEffect } from 'react'
import { Input, Button, StrongPasswordInput, Textarea } from 'react-rainbow-components'

const SignUpOrIn = (props) => {
  // STATE
  const { history, setLogIn, setUserID } = props
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [img, setImg] = useState('')
  const [signingUp, setSigningUp] = useState(false)

  // FUNCTIONS & AXIOS CALLS
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleBioChange = (e) => {
    setBio(e.target.value)
  }

  const handleImgChange = (e) => {
    setImg(e.target.value)
  }

  const handleLocationChange = (e) => {
    const re = /^[0-9\b]+$/
    if (e.target.value === '' || re.test(e.target.value)) {
      setLocation(e.target.value)
    }
  }

  function getStrength() {
    const { length } = password
    if (length === 0) {
      return undefined
    }
    if (length <= 3) {
      return 'weak'
    }
    if (length > 3 && length < 8) {
      return 'average'
    }
    return 'strong'
  }

  const passwordState = getStrength()

  // const handleSignUp = () => {
  //   history.push('/signup')
  // }
  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        name: name,
        username: username,
        email: email,
        password: password,
        location: location,
        bio: bio,
        image: img
      })
      setUserID(res.data.user.id)
      localStorage.setItem('token', res.data.token)
      history.push('/')
      setLogIn(true)
    } catch (error) {
      console.log(error)
    }
  }  

  const handleLogin = async (e) => {
    e.preventDefault()
    setSigningUp(false)
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email: email,
        password: password
      })
      setUserID(res.data.user.id)
      localStorage.setItem('token', res.data.token)
      history.push('/')
      setLogIn(true)
    } catch (error) {
      alert(error.message)
    }
  }

  const getToken = async(token) => {
    if (token) {
      const res = await axios.get(`${BASE_URL}/auth/session`)
      setUserID(res.data.id)
      return setLogIn(true)
    }
  }

  // ON LOAD
  useEffect(() => {
    getToken()
  }, [])

  return !signingUp ? (
    <div className="login">
      <form>
        <Input
          type="email"
          rows={1}
          value={email}
          onChange={handleEmailChange}
          maxLength={255}
          placeholder="Email"
        />
        <Input
          type="password"
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <div>
          <Button label="Sign Up" variant="border" onClick={() => setSigningUp(true)} />
          <Button label="Log In" variant="border" onClick={handleLogin}/>
        </div>
        </form>
    </div>
  ) : (
    <div>
      <form>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          maxLength={255}
          placeholder="Email"
        />
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          maxLength={255}
          placeholder="Username"
        />
        <StrongPasswordInput
          label="Password"
          placeholder="Password"
          bottomHelpText="Your password must be at least 8 characters long."
          value={password}
          passwordState={passwordState}
          onChange={handlePasswordChange}
        />
        <Input
          type="url"
          label="Profile Picture"
          rows={1}
          value={img}
          onChange={handleImgChange}
          maxLength={255}
          placeholder="Image Link"
        />
        <Input
          label="Name"
          rows={1}
          value={name}
          onChange={handleNameChange}
          maxLength={255}
          placeholder="Name"
        />
        <Input
          label="Zip Code"
          maxLength={5}
          value={location}
          onChange={handleLocationChange}
          placeholder="Zip Code"
        />
        <Textarea
          label="Bio"
          rows={4}
          value={bio}
          onChange={handleBioChange}
          maxLength={255}
          placeholder="Tell us about yourself!"
        />
        <Button label="Submit" variant="border" onClick={handleSignUp} />
      </form>
    </div>
  )
}
export default SignUpOrIn