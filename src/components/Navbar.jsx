import { useState, useEffect, useRef } from 'react'
import { Bell, ChevronDown, User, Settings, LogOut, Heart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthManager } from '../utils/authManager'

export default function Navbar({ showLinks = true, onNavClick, searchComponent, handleLogout }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleFavoritesUpdated = (event) => setFavoritesCount(event.detail || 0)

    const initialFavorites = JSON.parse(localStorage.getItem('cineflix_favorites')) || []
    setFavoritesCount(initialFavorites.length)

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated)
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdated)
  }, [])

  const navLinks = ['Trending', 'Top 10', 'Action', 'Comedies', 'Horror', 'Sci-Fiction']

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-1">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <Link to={showLinks ? "/browse" : "/"} onClick={() => onNavClick && onNavClick('Home')}>
            <h1 className="logo">CineFlix</h1>
          </Link>

          {showLinks && (
            <div className="hidden md:flex space-x-6 text-sm">
              <Link
                to="/browse"
                onClick={() => onNavClick && onNavClick('Home')}
                className="hover:text-gray-300 focus:outline-none transition"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => onNavClick && onNavClick(link)}
                  className="hover:text-gray-300 focus:outline-none transition"
                >
                  {link}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          {showLinks ? (
            <>
              {searchComponent}

              <button className="hover:text-gray-300">
                <Bell size={20} />
              </button>

              <button 
                onClick={() => navigate('/favorites')}
                className="hover:text-gray-300 relative"
                title="My Favorites"
              >
                <Heart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              </button>

              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <ChevronDown size={16} />
              </div>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-gray-700 rounded shadow-lg z-50">
                  <ul className="text-sm text-gray-300">
                    <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer">
                      <User size={16} />
                      <span>Profile</span>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
                      onClick={() => navigate('/favorites')}
                    >
                      <Heart size={16} />
                      <span>My Favorites</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer">
                      <Settings size={16} />
                      <span>Settings</span>
                    </li>
                    <li 
                      className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer" 
                      onClick={() => {
                        // Clear session using AuthManager
                        AuthManager.clearSession()
                        
                        // Call parent logout handler if available
                        if (handleLogout) {
                          handleLogout()
                        }
                        
                        // Navigate to login and force reload
                        window.location.href = '/login'
                      }}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-cineflix text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
