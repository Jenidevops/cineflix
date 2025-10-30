import { Play, Plus, Check, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { tmdbApi } from '../services/tmdbApi'
import { favoritesManager } from '../utils/favoritesManager'
import { useState, useEffect } from 'react'

function RelatedMovieCard({ movie, onSelect }) {
  const [isFavorite, setIsFavorite] = useState(favoritesManager.isFavorite(movie.id))
  const [showAdded, setShowAdded] = useState(false)

  useEffect(() => {
    const handleUpdate = () => {
      setIsFavorite(favoritesManager.isFavorite(movie.id))
    }
    window.addEventListener('favoritesUpdated', handleUpdate)
    return () => window.removeEventListener('favoritesUpdated', handleUpdate)
  }, [movie.id])

  const handleToggleFavorite = (e) => {
    e.stopPropagation()
    const movieWithImage = {
      ...movie,
      image: tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')
    }
    const newFavoriteStatus = favoritesManager.toggleFavorite(movieWithImage)
    setIsFavorite(newFavoriteStatus)
    
    if (newFavoriteStatus) {
      setShowAdded(true)
      setTimeout(() => setShowAdded(false), 2000)
    }
    
    window.dispatchEvent(new Event('favoritesUpdated'))
  }

  return (
    <div 
      className="relative flex-none w-48 cursor-pointer group/card"
      onClick={() => onSelect(movie)}
    >
      {showAdded && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-bounce">
          ✓ Added
        </div>
      )}

      <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 group-hover/card:scale-105">
        <img
          src={tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="192" height="288"%3E%3Crect width="192" height="288" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition flex flex-col justify-end p-4">
          <h3 className="font-semibold text-base mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center space-x-2 text-xs mb-3">
            <span className="text-green-500 font-semibold">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span className="text-gray-300">{movie.release_date?.substring(0, 4)}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"
              title="Play"
            >
              <Play size={16} fill="black" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`border-2 rounded-full p-2 transition ${
                isFavorite 
                  ? 'border-green-500 bg-green-500/20' 
                  : 'border-gray-400 hover:border-white'
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <Check size={16} className="text-green-500" /> : <Plus size={16} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelect(movie)
              }}
              className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition"
              title="More info"
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RelatedMovies({ movies, title = "Related Movies", onSelect, sectionId = "related" }) {
  if (!movies || movies.length === 0) return null

  const scroll = (direction) => {
    const container = document.getElementById(`related-${sectionId}`)
    const scrollAmount = direction === 'left' ? -600 : 600
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft size={32} />
        </button>
        <div 
          id={`related-${sectionId}`}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <RelatedMovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelect}
            />
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  )
}