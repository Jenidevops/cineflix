const API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'

// Check if API key is configured
if (!API_KEY) {
  console.error('⚠️ TMDB API key is not configured. Please add VITE_TMDB_API_KEY to your environment variables.')
}

export const tmdbApi = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Get trending movies
  getTrendingMovies: async (page = 1) => {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    )
    return response.json()
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,reviews,similar,recommendations`
    )
    return response.json()
  },

  // Get movie genres
  getGenres: async () => {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    )
    return response.json()
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1, sortBy = 'popularity.desc') => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=${sortBy}`
    )
    return response.json()
  },

  // Discover movies with filters
  discoverMovies: async (params = {}) => {
    const {
      page = 1,
      sortBy = 'popularity.desc',
      genreId = null,
      year = null,
      minRating = null
    } = params

    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}`
    
    if (genreId) url += `&with_genres=${genreId}`
    if (year) url += `&year=${year}`
    if (minRating) url += `&vote_average.gte=${minRating}`

    const response = await fetch(url)
    return response.json()
  },

  // Get movie videos (trailers)
  getMovieVideos: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    )
    return response.json()
  },

  // Get movie reviews
  getMovieReviews: async (movieId, page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Get similar movies
  getSimilarMovies: async (movieId, page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Get movie recommendations
  getRecommendations: async (movieId, page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Helper function to get full image URL
  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750"%3E%3Crect width="500" height="750" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
    return `${IMAGE_BASE_URL}/${size}${path}`
  },

  // Helper function to get backdrop URL
  getBackdropUrl: (path, size = 'original') => {
    if (!path) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"%3E%3Crect width="1920" height="1080" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
    return `${IMAGE_BASE_URL}/${size}${path}`
  },

  // Helper to get YouTube trailer URL
  getTrailerUrl: (videoKey) => {
    return `https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1&modestbranding=1&rel=0`
  }
}