import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import GetStarted from './pages/GetStarted'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import SubscriptionPlans from './pages/SubscriptionPlans'
import Browse from './pages/Browse'
import Favorites from './pages/Favorites'
import { AuthManager } from './utils/authManager'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check authentication using AuthManager
    const authenticated = AuthManager.isAuthenticated()
    const userData = AuthManager.getUser()
    
    if (authenticated && userData) {
      setIsAuthenticated(true)
      setUser(userData)
    }
  }, [])

  const handleLogout = () => {
    AuthManager.clearSession()
    setIsAuthenticated(false)
    setUser(null)
  }

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/subscription" 
          element={
            <ProtectedRoute>
              <SubscriptionPlans />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/browse" 
          element={
            <ProtectedRoute>
              <Browse handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute>
              <Favorites handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
