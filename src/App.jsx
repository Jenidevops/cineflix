import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import SignUp from './pages/SignUp'
import Browse from './pages/Browse'
import Favorites from './pages/Favorites'
import { useState } from 'react'

function App() {
  // Temporarily set to true to bypass authentication for testing
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <Router basename="/cineflix">
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/browse" 
          element={
            isAuthenticated ? <Browse /> : <Navigate to="/signup" replace />
          } 
        />
        <Route 
          path="/favorites" 
          element={
            isAuthenticated ? <Favorites /> : <Navigate to="/signup" replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
