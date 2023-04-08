import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`)

    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()
    console.log(json)

    if (response.ok) {
      setUsername('')
      setPassword('')
      setError('')
    } else {
      setError(json.error)
    }
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
          type="password" 
          placeholder='password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        <button className='register-button'>Register</button>
      </form>
      
      <span className='already-exist'><Link to="/login">Already have an account?</Link></span>
      {error && 
      <span className="register-error">{error}</span>
      }
      
    </div>
  )
}

export default Register