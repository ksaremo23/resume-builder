import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    setIsAuthenticated(!!currentUser)
  }, [])

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/" replace />
}

export default ProtectedRoute

