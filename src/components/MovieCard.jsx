import { Play, Plus, Check, ThumbsUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { favoritesManager } from '../utils/favoritesManager'

export default function MovieCard({ item, onSelect, isInMyList, toggleMyList, sectionType }) {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [thumbAnimation, setThumbAnimation] = useState(false)

  // Map sectionType to glow color
  const glowColors = {
    trending: '#ffffff33',
    top10: '#ffd70033',
    action: '#ff000033',
    comedy: '#ffa50033',
    horror: '#8a2be233',
    scifi: '#00ffff33',
    default: '#ffffff33'
  }

  const glowColor = glowColors[sectionType] || glowColors.default

  useEffect(() => {
    updateFavoritesCount()
    const handleFavoritesUpdate = () => updateFavoritesCount()
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate)
    window.addEventListener('storage', handleFavoritesUpdate)

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate)
      window.removeEventListener('storage', handleFavoritesUpdate)
    }
  }, [])

  const updateFavoritesCount = () => {
    const favorites = favoritesManager.getFavorites()
    setFavoritesCount(favorites.length)
  }

  const handleToggleList = (e) => {
    e.stopPropagation()
    toggleMyList(item)

    if (!isInMyList) {
      setNotificationMessage('Added to List')
    } else {
      setNotificationMessage('Removed from List')
    }

    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      updateFavoritesCount()
    }, 2000)
  }

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    setThumbAnimation(true)
    setTimeout(() => setThumbAnimation(false), 300) // bounce duration
  }

  return (
    <div className="relative flex-none w-48">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-4 py-2 rounded-lg shadow-2xl animate-bounce flex items-center space-x-3">
          <span className="font-semibold">{notificationMessage}</span>
          {notificationMessage === 'Added to List' && favoritesCount > 0 && (
            <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">{favoritesCount}</span>
          )}
        </div>
      )}

      {/* Card */}
      <div
        className="group cursor-pointer transition-transform duration-300 hover:scale-105 relative"
        onClick={() => onSelect(item)}
      >
        {/* Animated Glow */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulseGlow"
          style={{
            boxShadow: `0 0 25px 5px ${glowColor}`,
            animation: 'pulseGlow 2s ease-in-out infinite alternate'
          }}
        ></div>

        {/* Poster Image */}
        <div className="relative w-48 aspect-[2/3] rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { 
              e.target.src = 'https://via.placeholder.com/192x288?text=No+Image' 
            }}
          />

          {/* Rank */}
          {item.rank && (
            <div
              className="absolute -bottom-4 -left-4 text-8xl font-black text-white z-10 pointer-events-none"
              style={{
                textShadow:
                  '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 20px rgba(0,0,0,0.8)',
                WebkitTextStroke: '2px black',
              }}
            >
              {item.rank}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

            <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end pointer-events-auto">
              <h3 className="font-semibold text-base mb-2 line-clamp-2 text-white">{item.title}</h3>
              <div className="flex items-center space-x-2 text-xs mb-3 text-white">
                <span className="text-green-500 font-semibold">{item.match}% Match</span>
                <span className="border border-gray-400 px-1">{item.rating}</span>
                <span>{item.year || item.release_date?.substring(0, 4)}</span>
              </div>

              {/* Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"
                  title="Play"
                >
                  <Play size={16} fill="black" />
                </button>

                <button
                  onClick={handleToggleList}
                  className={`border-2 rounded-full p-2 transition ${
                    isInMyList ? 'border-green-500 bg-green-500/20' : 'border-gray-400 hover:border-white'
                  }`}
                  title={isInMyList ? 'Remove from list' : 'Add to list'}
                >
                  {isInMyList ? <Check size={16} className="text-green-500" /> : <Plus size={16} />}
                </button>

                {/* ThumbsUp with bounce + glow */}
                <button
                  onClick={handleLike}
                  className={`relative p-2 transition-transform duration-300 ${
                    thumbAnimation ? 'animate-bounce' : ''
                  }`}
                  title="Like"
                >
                  <ThumbsUp
                    size={16}
                    className={`transition-colors duration-300 ${liked ? 'text-white' : 'text-gray-400'}`}
                  />
                  {liked && (
                    <span
                      className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
                      style={{ filter: 'blur(2px)' }}
                    ></span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for pulseGlow */}
      <style jsx>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px 3px ${glowColor}; }
          50% { box-shadow: 0 0 25px 5px ${glowColor}; }
          100% { box-shadow: 0 0 15px 3px ${glowColor}; }
        }
      `}</style>
    </div>
  )
}
