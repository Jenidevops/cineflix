import { useState } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  const handleClear = () => {
    setQuery('')
    setIsExpanded(false)
    onClear()
  }

  return (
    <div className="relative">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="hover:text-gray-300 transition"
        >
          <Search size={20} />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-64 px-4 py-2 pl-10 bg-black/70 border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
              autoFocus
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}