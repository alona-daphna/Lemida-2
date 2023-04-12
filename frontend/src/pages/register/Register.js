import React, { useContext, useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import Loading from '../loading/Loading'


const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'include'
    })

    const json = await response.json()
    console.log(json)

    if (response.ok) {
      const response2 = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (response2.ok) {
        setUser(json)
        setUsername('')
        setPassword('')
        setError('')
        setTimeout(() => {
          setIsLoading(false)
          navigate('/')
        }, 1500)
      }
    } else {
      setError(json.error)
    }
  }

  return (
    <div className='register-container'>
      {isLoading ? <Loading /> :
        <>
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
        </>
      }
    </div>
  )
}

export default Register