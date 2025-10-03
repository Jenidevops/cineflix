const FAVORITES_KEY = 'cineflix_favorites'

export const favoritesManager = {
  // Get all favorites
  getFavorites: () => {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  },

  // Add to favorites (store complete movie data including image)
  addFavorite: (movie) => {
    const favorites = favoritesManager.getFavorites()
    if (!favorites.some(fav => fav.id === movie.id)) {
      // Store complete movie data
      const favoriteMovie = {
        id: movie.id,
        title: movie.title,
        image: movie.image || movie.backdrop_path || movie.poster_path,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
        match: movie.match || Math.round((movie.vote_average || 0) * 10),
        year: movie.year || movie.release_date?.substring(0, 4),
        rating: movie.rating,
        duration: movie.duration,
        addedAt: new Date().toISOString()
      }
      favorites.push(favoriteMovie)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  },

  // Remove from favorites
  removeFavorite: (movieId) => {
    const favorites = favoritesManager.getFavorites()
    const updated = favorites.filter(fav => fav.id !== movieId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  },

  // Check if movie is favorite
  isFavorite: (movieId) => {
    const favorites = favoritesManager.getFavorites()
    return favorites.some(fav => fav.id === movieId)
  },

  // Toggle favorite
  toggleFavorite: (movie) => {
    if (favoritesManager.isFavorite(movie.id)) {
      favoritesManager.removeFavorite(movie.id)
      return false
    } else {
      favoritesManager.addFavorite(movie)
      return true
    }
  },

  // Clear all favorites
  clearAll: () => {
    localStorage.removeItem(FAVORITES_KEY)
  }
}