const CONTINUE_WATCHING_KEY = 'cineflix_continue_watching'

export const continueWatchingManager = {
  // Get all continue watching items
  getContinueWatching: () => {
    const items = localStorage.getItem(CONTINUE_WATCHING_KEY)
    return items ? JSON.parse(items) : []
  },

  // Add or update continue watching
  addToContinueWatching: (movie, progress = 0, duration = 0) => {
    const items = continueWatchingManager.getContinueWatching()
    const existingIndex = items.findIndex(item => item.id === movie.id)
    
    const watchItem = {
      ...movie,
      progress,
      duration,
      lastWatched: new Date().toISOString(),
      timestamp: Date.now()
    }

    if (existingIndex >= 0) {
      items[existingIndex] = watchItem
    } else {
      items.unshift(watchItem)
    }

    // Keep only last 20 items
    const updated = items.slice(0, 20)
    localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('continueWatchingUpdated'))
  },

  // Remove from continue watching
  removeFromContinueWatching: (movieId) => {
    const items = continueWatchingManager.getContinueWatching()
    const updated = items.filter(item => item.id !== movieId)
    localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('continueWatchingUpdated'))
  },

  // Get progress for a movie
  getProgress: (movieId) => {
    const items = continueWatchingManager.getContinueWatching()
    const item = items.find(i => i.id === movieId)
    return item ? item.progress : 0
  },

  // Clear all continue watching
  clearAll: () => {
    localStorage.removeItem(CONTINUE_WATCHING_KEY)
    window.dispatchEvent(new Event('continueWatchingUpdated'))
  }
}