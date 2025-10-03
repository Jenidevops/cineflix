import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import { useMemo } from 'react'

export default function ContentRow({ category, onSelectContent, myList, toggleMyList }) {
  // Repeat items to create seamless carousel if less than 10 items
  const displayItems = useMemo(() => {
    const items = category.items || []
    if (items.length === 0) return []
    
    // If less than 10 items, repeat them to fill carousel
    if (items.length < 10) {
      const repeatedItems = []
      const repeatCount = Math.ceil(10 / items.length)
      
      for (let i = 0; i < repeatCount; i++) {
        items.forEach((item, index) => {
          repeatedItems.push({
            ...item,
            // Add unique key by combining original id with repeat index
            uniqueKey: `${item.id}-${i}-${index}`
          })
        })
      }
      return repeatedItems
    }
    
    return items.map((item, index) => ({
      ...item,
      uniqueKey: `${item.id}-${index}`
    }))
  }, [category.items])

  const scroll = (direction) => {
    const container = document.getElementById(`row-${category.id}`)
    const scrollAmount = direction === 'left' ? -600 : 600
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const isInMyList = (itemId) => myList.some(item => item.id === itemId)

  if (displayItems.length === 0) return null

  return (
    <div className="px-4 md:px-12 mb-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{category.title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft size={32} />
        </button>
        <div
          id={`row-${category.id}`}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {displayItems.map((item) => (
            <MovieCard
              key={item.uniqueKey}
              item={item}
              onSelect={onSelectContent}
              isInMyList={isInMyList(item.id)}
              toggleMyList={toggleMyList}
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