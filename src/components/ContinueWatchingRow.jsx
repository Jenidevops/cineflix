import { useState, useEffect } from 'react'
import { Play, X } from 'lucide-react'
import { continueWatchingManager } from '../utils/continueWatchingManager'
import { tmdbApi } from '../services/tmdbApi'

export default function ContinueWatchingRow({ onSelect }) {
  const [continueWatching, setContinueWatching] = useState([])

  useEffect(() => {
    loadContinueWatching()

    const handleUpdate = () => {
      loadContinueWatching()
    }

    window.addEventListener('continueWatchingUpdated', handleUpdate)
    return () => window.removeEventListener('continueWatchingUpdated', handleUpdate)
  }, [])

  const loadContinueWatching = () => {
    setContinueWatching(continueWatchingManager.getContinueWatching())
  }

  const handleRemove = (e, movieId) => {
    e.stopPropagation()
    continueWatchingManager.removeFromContinueWatching(movieId)
  }

  if (continueWatching.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 px-4 md:px-12">Continue Watching</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth px-4 md:px-12">
        {continueWatching.map((movie) => (
          <div
            key={movie.id}
            className="relative flex-none w-64 cursor-pointer transition-transform duration-300 hover:scale-105 group"
            onClick={() => onSelect(movie)}
          >
            <div className="relative">
              <img
                src={tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-36 object-cover rounded"
              />
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div
                  className="h-full bg-netflix"
                  style={{ width: `${(movie.progress / movie.duration) * 100}%` }}
                />
              </div>
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <div className="bg-white rounded-full p-3">
                  <Play size={24} className="text-black" fill="black" />
                </div>
              </div>
              {/* Remove Button */}
              <button
                onClick={(e) => handleRemove(e, movie.id)}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-2">
              <h3 className="font-semibold text-sm line-clamp-1">{movie.title}</h3>
              <p className="text-xs text-gray-400">
                {Math.round((movie.progress / movie.duration) * 100)}% watched
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}