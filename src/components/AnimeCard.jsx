import React from 'react'
import { useNavigate } from 'react-router-dom'

const AnimeCard = ({ anime, showEpisodes = false, showRank = false }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/anime/${anime.id}`)
  }

  return (
    <div 
      onClick={handleClick}
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="aspect-w-3 aspect-h-4 mb-3">
        <img 
          src={anime.poster} 
          alt={anime.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="font-medium text-lg mb-2">{anime.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{anime.jname}</p>
      
      {/* Optional type display */}
      {anime.type && (
        <p className="text-sm text-gray-600">Type: {anime.type}</p>
      )}
      
      {/* Optional duration display */}
      {anime.duration && (
        <p className="text-sm text-gray-600">Duration: {anime.duration}</p>
      )}
      
      {/* Optional episodes display */}
      {showEpisodes && anime.episodes && (
        <div className="mt-2 text-sm">
          <span className="text-blue-600">
            Sub: {anime.episodes.sub || 0}
          </span>
          {anime.episodes.dub && (
            <span className="ml-3 text-green-600">
              Dub: {anime.episodes.dub}
            </span>
          )}
        </div>
      )}

      {/* Optional rank display */}
      {showRank && anime.rank && (
        <div className="mt-2 text-sm">
          <span className="text-purple-600">
            Rank: #{anime.rank}
          </span>
        </div>
      )}
    </div>
  )
}

export default AnimeCard 