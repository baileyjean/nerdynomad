import axios from 'axios'
import { BASE_URL } from '../globals.js'
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'react-rainbow-components'

const LoginPage = (props) => {
  // STATE
  const { history, setLogIn, setUserID } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // FUNCTIONS & AXIOS CALLS
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
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
  const handleSignUp = () => {
    history.push('/signup')
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

  return (
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
          <Button label="Sign Up" variant="border" onClick={handleSignUp} />
          <Button label="Log In" variant="border" onClick={handleLogin}/>
        </div>
        </form>
    </div>
  )
}
export default LoginPage