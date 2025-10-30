import { Play, Plus, Check, Info } from 'lucide-react'
import { tmdbApi } from '../services/tmdbApi'
import { favoritesManager } from '../utils/favoritesManager'
import { useState } from 'react'

export default function TMDBMovieCard({ movie, onSelect }) {
  const [isFavorite, setIsFavorite] = useState(favoritesManager.isFavorite(movie.id))

  const handleToggleFavorite = (e) => {
    e.stopPropagation()
    const movieWithImage = {
      ...movie,
      image: tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')
    }
    const newFavoriteStatus = favoritesManager.toggleFavorite(movieWithImage)
    setIsFavorite(newFavoriteStatus)
    window.dispatchEvent(new Event('favoritesUpdated'))
  }

  return (
    <div 
      className="relative flex-none w-48 cursor-pointer transition-transform duration-300 hover:scale-105 group/card"
      onClick={() => onSelect(movie)}
    >
      <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl">
        <img
          src={tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750"%3E%3Crect width="500" height="750" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
          }}
        />
        
        {/* Hover Overlay */}
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
              className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <Check size={16} /> : <Plus size={16} />}
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