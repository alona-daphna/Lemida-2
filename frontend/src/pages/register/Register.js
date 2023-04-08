import React, { useState } from 'react'
import './register.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`)
  }

  return (
    <div className='register-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='username'
          value={username} 
          onChange={(e) => setUsername(e.target.value)} />
        <input 
          type="text" 
          placeholder='password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        <button className='register-button'>Register</button>
      </form>
    </div>
  )
}

export default Register