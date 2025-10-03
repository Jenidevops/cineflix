import { useState, useEffect } from 'react'
import { Filter, SortAsc } from 'lucide-react'
import { tmdbApi } from '../services/tmdbApi'

export default function FilterSort({ onFilterChange, onSortChange }) {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedSort, setSelectedSort] = useState('popularity.desc')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadGenres()
  }, [])

  const loadGenres = async () => {
    try {
      const data = await tmdbApi.getGenres()
      setGenres(data.genres || [])
    } catch (error) {
      console.error('Error loading genres:', error)
    }
  }

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId)
    onFilterChange({ genreId })
  }

  const handleSortChange = (sortBy) => {
    setSelectedSort(sortBy)
    onSortChange(sortBy)
  }

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
    { value: 'title.asc', label: 'A to Z' },
    { value: 'title.desc', label: 'Z to A' }
  ]

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition mb-4"
      >
        <Filter size={18} />
        <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
      </button>

      {showFilters && (
        <div className="bg-gray-900 p-6 rounded-lg space-y-6">
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              <Filter size={16} className="inline mr-2" />
              Filter by Genre
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <button
                onClick={() => handleGenreChange('')}
                className={`px-3 py-2 rounded text-sm transition ${
                  selectedGenre === ''
                    ? 'bg-cineflix text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                All Genres
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreChange(genre.id)}
                  className={`px-3 py-2 rounded text-sm transition ${
                    selectedGenre === genre.id
                      ? 'bg-cineflix text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              <SortAsc size={16} className="inline mr-2" />
              Sort By
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`px-3 py-2 rounded text-sm transition ${
                    selectedSort === option.value
                      ? 'bg-cineflix text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}