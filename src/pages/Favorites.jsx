import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { favoritesManager } from '../utils/favoritesManager'
import { tmdbApi } from '../services/tmdbApi'
import { Play, X, Info } from 'lucide-react'

export default function Favorites({ handleLogout }) {
  const [favorites, setFavorites] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadFavorites()
    
    const handleStorageChange = () => {
      loadFavorites()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('favoritesUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('favoritesUpdated', handleStorageChange)
    }
  }, [])

  const loadFavorites = () => {
    setFavorites(favoritesManager.getFavorites())
  }

  const handleRemoveFavorite = (e, movieId) => {
    e.stopPropagation()
    favoritesManager.removeFavorite(movieId)
    loadFavorites()
    window.dispatchEvent(new Event('favoritesUpdated'))
  }

  const handleMovieSelect = async (movie) => {
    if (movie.vote_average !== undefined) {
      // TMDB movie
      try {
        const details = await tmdbApi.getMovieDetails(movie.id)
        setSelectedMovie({
          ...movie,
          ...details,
          image: movie.image || tmdbApi.getBackdropUrl(movie.backdrop_path || movie.poster_path),
        })
      } catch (error) {
        console.error('Error loading movie details:', error)
        setSelectedMovie(movie)
      }
    } else {
      // Mock movie
      setSelectedMovie(movie)
    }
  }

  const getImageUrl = (movie) => {
    // Check if image already exists (stored from TMDB)
    if (movie.image) {
      return movie.image
    }
    // Fallback to TMDB paths
    if (movie.backdrop_path || movie.poster_path) {
      return tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')
    }
    // Final fallback
    return 'https://via.placeholder.com/500x750?text=No+Image'
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar showLinks={true} handleLogout={handleLogout} />
      
      <div className="pt-24 px-4 md:px-12 pb-20">
        <h1 className="text-4xl font-bold mb-8">My Favorites</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">No favorites yet!</p>
            <p className="text-gray-500 mb-8">Start adding movies to your favorites to see them here.</p>
            <button
              onClick={() => navigate('/browse')}
              className="bg-netflix px-8 py-3 rounded text-lg font-semibold hover:bg-red-700 transition"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <div 
                key={movie.id} 
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => handleMovieSelect(movie)}
              >
                <div className="relative w-full h-64 rounded overflow-hidden">
                  <img
                    src={getImageUrl(movie)}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center space-x-2 text-xs mb-3">
                      <span className="text-green-500 font-semibold">
                        {movie.match || Math.round((movie.vote_average || 0) * 10)}% Match
                      </span>
                      <span>{movie.year || movie.release_date?.substring(0, 4)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="bg-white text-black rounded-full p-2 hover:bg-gray-200"
                        title="Play"
                      >
                        <Play size={16} fill="black" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMovieSelect(movie)
                        }}
                        className="border-2 border-white rounded-full p-2 hover:bg-white/10"
                        title="More info"
                      >
                        <Info size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemoveFavorite(e, movie.id)}
                  className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black text-white px-3 py-1 rounded text-sm flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                  <span>Remove</span>
                </button>
                {/* Title Below Image */}
                <div className="mt-2">
                  <h4 className="font-semibold text-sm line-clamp-1">{movie.title}</h4>
                  <p className="text-xs text-gray-400">
                    {movie.year || movie.release_date?.substring(0, 4) || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <Modal
          content={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isInMyList={true}
          toggleMyList={() => {
            favoritesManager.removeFavorite(selectedMovie.id)
            loadFavorites()
            setSelectedMovie(null)
            window.dispatchEvent(new Event('favoritesUpdated'))
          }}
        />
      )}

      <Footer />
    </div>
  )
}