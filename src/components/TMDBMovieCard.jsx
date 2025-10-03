import { Play, Plus, Check, Info } from 'lucide-react'
import { tmdbApi } from '../services/tmdbApi'
import { favoritesManager } from '../utils/favoritesManager'
import { useState } from 'react'

export default function TMDBMovieCard({ movie, onSelect, toggleMyList, isInMyList }) {
  const [isFavorite, setIsFavorite] = useState(favoritesManager.isFavorite(movie.id))

  const handleToggleFavorite = (e) => {
    e.stopPropagation()
    const newFavoriteStatus = favoritesManager.toggleFavorite(movie)
    setIsFavorite(newFavoriteStatus)
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: favoritesManager.getFavorites().length }));
  }

  return (
    <div
      className="relative flex-none w-64 h-36 cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-30 group"
      onClick={() => onSelect(movie)}
    >
      <img
        src={tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')}
        alt={movie.title}
        className="w-full h-full object-cover rounded"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition rounded flex flex-col justify-end p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center space-x-2 text-xs mb-2">
          <span className="text-green-500 font-semibold">
            {Math.round(movie.vote_average * 10)}% Match
          </span>
          <span>{movie.release_date?.substring(0, 4)}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="bg-white text-black rounded-full p-1 hover:bg-gray-200"
            title="Play"
          >
            <Play size={16} fill="black" />
          </button>
          <button
            onClick={handleToggleFavorite}
            className="border-2 border-gray-400 rounded-full p-1 hover:border-white focus:outline-none z-10"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <Check size={16} /> : <Plus size={16} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(movie)
            }}
            className="border-2 border-gray-400 rounded-full p-1 hover:border-white"
            title="More info"
          >
            <Info size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}