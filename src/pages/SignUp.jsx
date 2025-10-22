import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import heroimage from '../images/heroimage.png' 

const API_URL = 'http://localhost:5001/api'

export default function SignUp({ setIsAuthenticated }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
    name: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData)
      
      if (response.data.success) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('isAuthenticated', 'true')
        
        // Navigate to subscription page
        navigate('/subscription', { state: { user: response.data.user } })
      }
    } catch (err) {
      console.error('Signup error:', err)
      if (err.response?.status === 409) {
        setErrors({ 
          general: 'This email is already registered. Please sign in instead.' 
        })
      } else {
        setErrors({ 
          general: err.response?.data?.message || 'Signup failed. Please try again.' 
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroimage}
          alt="Netflix Background"
          className="w-full h-full object-cover brightness-125"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar showLinks={false} />
      </div>
      
      {/* Content */}
      <div className="relative z-5 flex-1 flex items-center justify-center px-4 py-20">
          <div className="bg-black/75 backdrop-blur-sm rounded-md p-16 w-full max-w-md">
            <h1 className="text-3xl font-bold text-white mb-7">
              Create Your Account
            </h1>
            
            {errors.general && (
              <div className="bg-orange-500 text-white px-4 py-3 rounded mb-4 text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name (optional)"
                  className="w-full px-5 py-4 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full px-5 py-4 bg-gray-700 border ${
                    errors.email ? 'border-orange-500' : 'border-gray-600'
                  } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
                />
                {errors.email && (
                  <p className="text-orange-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password (min 4 characters)"
                  className={`w-full px-5 py-4 bg-gray-700 border ${
                    errors.password ? 'border-orange-500' : 'border-gray-600'
                  } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
                />
                {errors.password && (
                  <p className="text-orange-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cineflix text-white py-4 rounded text-base font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-16">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-white hover:underline font-semibold">
                  Sign in now
                </Link>
                .
              </p>
            </div>

          <div className="mt-8 text-xs text-gray-500">
            <p className="mb-2">
              This is a demo for educational purposes. Enter any email and password to continue.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  )
}