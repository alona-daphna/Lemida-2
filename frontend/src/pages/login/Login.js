import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`)
  }

  return (
    <div className='register-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='username'
          value={username} 
          onChange={(e) => setUsername(e.target.value)} />
        <input 
          type="password" 
          placeholder='password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        <button className='register-button'>Login</button>
      </form>
      
      <span><Link to="/register">New to our app?</Link></span>
    </div>
  )
}

export default Login