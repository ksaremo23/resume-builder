import React, { useState } from 'react'
import './AuthModal.css'

function AuthModal({ onClose, onSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isSignUp) {
      // Sign Up validation
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields')
        return
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userExists = users.find((u) => u.email === formData.email)
      if (userExists) {
        setError('Email already registered. Please sign in instead.')
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
      }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Set current user
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      onSuccess(newUser)
    } else {
      // Sign In validation
      if (!formData.email || !formData.password) {
        setError('Please enter email and password')
        return
      }

      // Check user credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      )

      if (!user) {
        setError('Invalid email or password')
        return
      }

      // Set current user
      localStorage.setItem('currentUser', JSON.stringify(user))
      onSuccess(user)
    }
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${!isSignUp ? 'active' : ''}`}
            onClick={() => {
              setIsSignUp(false)
              setError('')
              setFormData({ name: '', email: '', password: '', confirmPassword: '' })
            }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${isSignUp ? 'active' : ''}`}
            onClick={() => {
              setIsSignUp(true)
              setError('')
              setFormData({ name: '', email: '', password: '', confirmPassword: '' })
            }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="auth-subtitle">
            {isSignUp
              ? 'Sign up to start building your resume'
              : 'Sign in to continue to your dashboard'}
          </p>

          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          <div className="auth-switch">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => {
                    setIsSignUp(false)
                    setError('')
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
                  }}
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => {
                    setIsSignUp(true)
                    setError('')
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
                  }}
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal

