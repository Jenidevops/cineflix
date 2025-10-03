import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ContentRow from '../components/ContentRow'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import TMDBMovieCard from '../components/TMDBMovieCard'
import FilterSort from '../components/FilterSort'
import ContinueWatchingRow from '../components/ContinueWatchingRow'
import { categories, heroContent } from '../data/mockData'
import { tmdbApi } from '../services/tmdbApi'
import { favoritesManager } from '../utils/favoritesManager'

export default function Browse() {
  const [selectedContent, setSelectedContent] = useState(null)
  const [myList, setMyList] = useState([])
  const [currentHeroContent, setCurrentHeroContent] = useState(heroContent)
  const [tmdbMovies, setTmdbMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [filters, setFilters] = useState({ genreId: null, sortBy: 'popularity.desc' })
  const sectionRefs = useRef({})

  useEffect(() => {
    loadMovies(1)
  }, [filters])

  const fixImageUrl = (movie) => {
    if (movie.image) return movie
    if (movie.poster_path) {
      return { ...movie, image: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
    }
    if (movie.id) {
      for (const category of categories) {
        const found = category.items.find((item) => item.id === movie.id)
        if (found) {
          return { ...movie, image: found.image }
        }
      }
    }
    return movie
  }

  const loadMovies = async (page) => {
    setLoading(true)
    try {
      const data = await tmdbApi.discoverMovies({
        page,
        sortBy: filters.sortBy,
        genreId: filters.genreId
      })
      const fixedResults = data.results.map(fixImageUrl)
      setTmdbMovies(fixedResults)
      setTotalPages(Math.min(data.total_pages, 500))
      setCurrentPage(page)
    } catch (error) {
      console.error('Error loading movies:', error)
    }
    setLoading(false)
  }

  const handleSearch = async (query) => {
    if (!query.trim()) return
    
    setIsSearching(true)
    setSearchQuery(query)
    setLoading(true)
    setShowSearch(true)
    try {
      const data = await tmdbApi.searchMovies(query, 1)
      setSearchResults(data.results)
      setTotalPages(Math.min(data.total_pages, 500))
      setCurrentPage(1)
    } catch (error) {
      console.error('Error searching movies:', error)
    }
    setLoading(false)
  }

  const handleClearSearch = () => {
    setIsSearching(false)
    setSearchResults([])
    setSearchQuery('')
    setShowSearch(false)
    loadMovies(1)
  }

  const handlePageChange = async (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    
    if (isSearching && searchQuery) {
      try {
        const data = await tmdbApi.searchMovies(searchQuery, page)
        setSearchResults(data.results)
        setCurrentPage(page)
      } catch (error) {
        console.error('Error loading search results:', error)
      }
    } else {
      await loadMovies(page)
    }
    setLoading(false)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }))
    setCurrentPage(1)
  }

  const toggleMyList = (item) => {
    setMyList(prev => {
      const isFavorite = prev.some(i => i.id === item.id)
      let updatedList
      if (isFavorite) {
        updatedList = prev.filter(i => i.id !== item.id)
        favoritesManager.removeFavorite(item.id)
      } else {
        updatedList = [...prev, item]
        favoritesManager.addFavorite(item)
      }
      return updatedList
    })
  }

  const isInMyList = (itemId) => myList.some(item => item.id === itemId)

  const handleNavClick = (link) => {
    let category

    switch (link) {
      case 'Home':
        setCurrentHeroContent(heroContent)
        setShowSearch(false)
        handleClearSearch()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      case 'Trending':
        category = categories.find(cat => cat.id === 'trending')
        break
      case 'Top 10':
        category = categories.find(cat => cat.id === 'top10')
        break
      case 'Action':
        category = categories.find(cat => cat.id === 'action')
        break
      case 'Comedies':
        category = categories.find(cat => cat.id === 'comedy')
        break
      case 'Horror':
        category = categories.find(cat => cat.id === 'horror')
        break
      case 'Sci-Fiction':
        category = categories.find(cat => cat.id === 'scifi')
        break
      default:
        category = null
    }

    if (category && category.items && category.items.length > 0) {
      const firstItem = category.items[0]
      
      setCurrentHeroContent({
        title: firstItem.title,
        description: `Explore the best in ${category.title}. Featuring amazing content that will keep you entertained for hours.`,
        image: firstItem.image,
        rating: firstItem.rating || 'TV-14',
        duration: firstItem.duration || 'Various',
        genres: ['Drama', 'Thriller', 'Adventure']
      })

      setShowSearch(false)
      handleClearSearch()

      setTimeout(() => {
        const sectionElement = sectionRefs.current[category.id]
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  const handleMovieSelect = async (movie) => {
    try {
      const details = await tmdbApi.getMovieDetails(movie.id)
      setSelectedContent({
        ...movie,
        ...details,
        image: tmdbApi.getBackdropUrl(movie.backdrop_path || movie.poster_path),
        match: Math.round(movie.vote_average * 10),
        year: movie.release_date?.substring(0, 4),
        rating: details.adult ? 'R' : 'PG-13',
        duration: details.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : 'N/A'
      })
    } catch (error) {
      console.error('Error loading movie details:', error)
      setSelectedContent(movie)
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar 
        showLinks={true} 
        onNavClick={handleNavClick}
        searchComponent={<SearchBar onSearch={handleSearch} onClear={handleClearSearch} />}
      />
      
      {!showSearch && <Hero content={currentHeroContent} />}
      
      <div className={`relative ${showSearch ? 'pt-24' : '-mt-32'} z-20 pb-20`}>
        {/* Continue Watching Section */}
        {!showSearch && <ContinueWatchingRow onSelect={handleMovieSelect} />}

        {showSearch && (isSearching || searchResults.length > 0) && (
          <div className="px-4 md:px-12 mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {isSearching ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
            </h2>
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cineflix"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {(isSearching ? searchResults : tmdbMovies).map((movie) => (
                    <TMDBMovieCard
                      key={movie.id}
                      movie={movie}
                      onSelect={handleMovieSelect}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        )}

        {!showSearch && (
          <>
            {/* Filter & Sort Section */}
            <div className="px-4 md:px-12 mb-12">
              <FilterSort
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
              />
            </div>

            {/* TMDB Movies Section */}
            <div className="px-4 md:px-12 mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                {filters.genreId ? 'Filtered Results' : 'Popular on CineFlix'}
              </h2>
              {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cineflix"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {tmdbMovies.map((movie) => (
                      <TMDBMovieCard
                        key={movie.id}
                        movie={movie}
                        onSelect={handleMovieSelect}
                      />
                    ))}
                  </div>
                  
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>

            {/* Original Mock Categories */}
            <div className="space-y-12">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  ref={(el) => (sectionRefs.current[category.id] = el)}
                  id={category.id}
                >
                  <ContentRow
                    category={category}
                    onSelectContent={setSelectedContent}
                    myList={myList}
                    toggleMyList={toggleMyList}
                    showAddButton={!['trending', 'top10', 'comedy', 'horror', 'action', 'sci-fi'].includes(category.id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Modal
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
        isInMyList={selectedContent ? (favoritesManager.isFavorite(selectedContent.id) || isInMyList(selectedContent.id)) : false}
        toggleMyList={() => {
          if (selectedContent) {
            if (selectedContent.vote_average !== undefined) {
              favoritesManager.toggleFavorite(selectedContent)
              window.dispatchEvent(new Event('favoritesUpdated'))
            } else {
              toggleMyList(selectedContent)
            }
          }
        }}
        onMovieSelect={handleMovieSelect}
      />

      <Footer />
    </div>
  )
}