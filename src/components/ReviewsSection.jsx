import { useState } from 'react'
import { Star, ThumbsUp, User } from 'lucide-react'

export default function ReviewsSection({ reviews }) {
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (reviewId) => {
    setExpanded(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateText = (text, maxLength = 300) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No reviews available yet.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-4">User Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {review.author_details.avatar_path ? (
                <img
                  src={
                    review.author_details.avatar_path.startsWith('/https')
                      ? review.author_details.avatar_path.substring(1)
                      : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                  }
                  alt={review.author}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <User size={24} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{review.author}</h4>
                  <p className="text-sm text-gray-400">{formatDate(review.created_at)}</p>
                </div>
                {review.author_details.rating && (
                  <div className="flex items-center space-x-1 bg-yellow-600/20 px-3 py-1 rounded">
                    <Star size={16} className="text-yellow-500" fill="currentColor" />
                    <span className="font-semibold">{review.author_details.rating}/10</span>
                  </div>
                )}
              </div>
              <p className="text-gray-300 whitespace-pre-line">
                {expanded[review.id] ? review.content : truncateText(review.content)}
              </p>
              {review.content && review.content.length > 300 && (
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="text-netflix hover:underline mt-2 text-sm font-semibold"
                >
                  {expanded[review.id] ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}