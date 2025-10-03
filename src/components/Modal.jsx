import { X, Play, Plus, Check, ThumbsUp, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { tmdbApi } from "../services/tmdbApi";
import TrailerPlayer from "./TrailerPlayer";
import ReviewsSection from "./ReviewsSection";
import RelatedMovies from "./RelatedMovies";
import { continueWatchingManager } from "../utils/continueWatchingManager";

export default function Modal({
  content,
  onClose,
  isInMyList,
  toggleMyList,
  onMovieSelect,
}) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (content && content.id) {
      loadMovieDetails(content.id);
    }
  }, [content?.id]);

  const loadMovieDetails = async (movieId) => {
    setLoading(true);
    try {
      const details = await tmdbApi.getMovieDetails(movieId);
      setMovieDetails(details);

      // Get trailer
      if (details.videos && details.videos.results) {
        const trailer =
          details.videos.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          ) || details.videos.results[0];

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      }
    } catch (error) {
      console.error("Error loading movie details:", error);
    }
    setLoading(false);
  };

  const handlePlayTrailer = () => {
    if (trailerKey) {
      setShowTrailer(true);
    }
  };

  const handlePlay = () => {
    // Simulate watching - add to continue watching with 0% progress
    continueWatchingManager.addToContinueWatching(content, 0, 7200); // 2 hours in seconds
    // Here you would typically start video playback
    alert("Video playback would start here!");
  };

  if (!content) return null;

  const details = movieDetails || content;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-zinc-900 rounded-lg max-w-6xl w-full mx-4 my-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Section */}
          <div className="relative h-96">
            <img
              src={
                content.backdrop_path || content.poster_path
                  ? tmdbApi.getBackdropUrl(
                      content.backdrop_path || content.poster_path
                    )
                  : content.image
              }
              alt={content.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-zinc-900 rounded-full p-2 hover:bg-zinc-800 transition"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
              <div className="flex space-x-4">
                <button
                  onClick={handlePlay}
                  className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 font-semibold transition"
                >
                  <Play size={24} fill="black" />
                  <span>Play</span>
                </button>
                {trailerKey && (
                  <button
                    onClick={handlePlayTrailer}
                    className="flex items-center space-x-2 bg-gray-600/70 px-8 py-3 rounded hover:bg-gray-600/50 font-semibold transition"
                  >
                    <Youtube size={24} />
                    <span>Trailer</span>
                  </button>
                )}
                <button
                  onClick={() => toggleMyList(content)}
                  className="border-2 border-white rounded-full p-3 hover:bg-white/10 transition"
                  title={
                    isInMyList ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isInMyList ? <Check size={24} /> : <Plus size={24} />}
                </button>
                <button className="border-2 border-white rounded-full p-3 hover:bg-white/10 transition">
                  <ThumbsUp size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex space-x-8 px-8">
              {["overview", "reviews", "related"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 capitalize transition ${
                    activeTab === tab
                      ? "border-b-2 border-netflix text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "related" ? "More Like This" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix"></div>
              </div>
            ) : (
              <>
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="flex space-x-8">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4 text-sm">
                          <span className="text-green-500 font-semibold">
                            {Math.round((details.vote_average || 0) * 10)}%
                            Match
                          </span>
                          <span>{details.release_date?.substring(0, 4)}</span>
                          <span className="border border-gray-400 px-2">
                            {details.adult ? "R" : "PG-13"}
                          </span>
                          {details.runtime && (
                            <span>
                              {Math.floor(details.runtime / 60)}h{" "}
                              {details.runtime % 60}m
                            </span>
                          )}
                          <span className="border border-gray-400 px-2">
                            HD
                          </span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {details.overview || "No description available."}
                        </p>
                      </div>
                      <div className="w-64 text-sm space-y-3">
                        {details.credits?.cast && (
                          <div>
                            <span className="text-gray-400">Cast: </span>
                            <span>
                              {details.credits.cast
                                .slice(0, 4)
                                .map((actor) => actor.name)
                                .join(", ")}
                            </span>
                          </div>
                        )}
                        {details.genres && (
                          <div>
                            <span className="text-gray-400">Genres: </span>
                            <span>
                              {details.genres.map((g) => g.name).join(", ")}
                            </span>
                          </div>
                        )}
                        {details.production_companies &&
                          details.production_companies.length > 0 && (
                            <div>
                              <span className="text-gray-400">Studio: </span>
                              <span>
                                {details.production_companies[0].name}
                              </span>
                            </div>
                          )}
                        {details.vote_count && (
                          <div>
                            <span className="text-gray-400">Reviews: </span>
                            <span>{details.vote_count.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Info */}
                    {details.tagline && (
                      <div className="bg-gray-800/30 p-4 rounded italic text-gray-300">
                        "{details.tagline}"
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "related" && (
                  <div className="space-y-8">
                    <RelatedMovies
                      movies={details.similar?.results || []}
                      title="Similar Movies"
                      sectionId="similar"
                      onSelect={(movie) => {
                        onMovieSelect && onMovieSelect(movie);
                        loadMovieDetails(movie.id);
                      }}
                    />
                    <RelatedMovies
                      movies={details.recommendations?.results || []}
                      title="Recommended For You"
                      sectionId="recommendations"
                      onSelect={(movie) => {
                        onMovieSelect && onMovieSelect(movie);
                        loadMovieDetails(movie.id);
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Player */}
      {showTrailer && trailerKey && (
        <TrailerPlayer
          videoKey={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}
