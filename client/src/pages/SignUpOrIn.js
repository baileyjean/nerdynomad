import axios from 'axios'
import { BASE_URL } from '../globals.js'
import React, { useState } from 'react'
import { Input, Button, StrongPasswordInput, Textarea, Select } from 'react-rainbow-components'
import logo from '../styles/images/Logo-NerdyNomad.png'

const SignUpOrIn = (props) => {
  //////////////////////// STATE ////////////////////////
  const { 
    history, 
    setLogIn, 
    setUserID, 
    nerdOptions, 
    nomadOptions
  } = props
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [img, setImg] = useState('')
  const [nerdRating, setNerdRating] = useState('')
  const [nomadRating, setNomadRating] = useState('')
  const [signingUp, setSigningUp] = useState(false)
  
  //////////////////////// FUNCTIONS ////////////////////////
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

  const handleNerdChange = (e) => {
    setNerdRating(parseInt(e.target.value))
  }

  const handleNomadChange = (e) => {
    setNomadRating(parseInt(e.target.value))
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

  //////////////////////// AXIOS CALLS ////////////////////////
  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        name: name,
        username: username,
        email: email,
        password: password,
        location: location,
        bio: bio,
        image: img,
        nerdRating: nerdRating,
        nomadRating: nomadRating
      })
      setUserID(res.data.user.id)
      localStorage.setItem('token', res.data.token)
      history.push('/')
      setLogIn(true)
    } catch (error) {
      alert(error.message)
    }
  }  

  const handleLogin = async () => {
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

  //////////////////////// FRONT-END RETURN ////////////////////////
  return !signingUp ? (
    <div className="login">
      <img src={logo} alt="welcome to nerdy nomad! this is our logo" />
      <form>
        <Input
          type="email"
          rows={1}
          value={email}
          onChange={handleEmailChange}
          maxLength={255}
          placeholder="Email"
          className="input"
        />
        <Input
          type="password"
          onChange={handlePasswordChange}
          placeholder="Password"
          className="input"
        />
        <div>
          <Button label="Sign Up" variant="border" onClick={() => setSigningUp(true)} />
          <Button label="Log In" variant="border" onClick={handleLogin}/>
        </div>
        </form>
    </div>
  ) : (
    <div className="signup">
      <img src={logo} alt="welcome to nerdy nomad! this is our logo" />
      <form>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          maxLength={255}
          placeholder="Email"
          className="input"
        />
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          maxLength={255}
          placeholder="Username"
          className="input"
        />
        <StrongPasswordInput
          label="Password"
          placeholder="Password"
          bottomHelpText="Your password must be at least 8 characters long."
          value={password}
          passwordState={passwordState}
          onChange={handlePasswordChange}
          className="input"
        />
        <Input
          type="url"
          label="Profile Picture"
          rows={1}
          value={img}
          onChange={handleImgChange}
          maxLength={255}
          placeholder="Image Link"
          className="input"
        />
        <Input
          label="Name"
          rows={1}
          value={name}
          onChange={handleNameChange}
          maxLength={255}
          placeholder="Name"
          className="input"
        />
        <Input
          label="Zip Code"
          maxLength={5}
          value={location}
          onChange={handleLocationChange}
          placeholder="Zip Code"
          className="input"
        />
        <p>If your Nerd Rating and Nomad Rating are sufficiently high, you'll get the NERDY NOMAD badge on your profile!</p>
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
        <Textarea
          label="Bio"
          rows={4}
          value={bio}
          onChange={handleBioChange}
          maxLength={255}
          placeholder="Tell us about yourself!"
          className="input"
        />
        <Button label="Submit" variant="border" onClick={handleSignUp} />
      </form>
    </div>
  )
}

export default SignUpOrIn;