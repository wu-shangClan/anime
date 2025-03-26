import React from 'react'
import { Link } from 'react-router-dom'

const HompageList = ({data}) => {
  return (
    <div className="py-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Top Airing Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Airing</h2>
          <div className="space-y-4">
            {data?.trendingAnimes?.slice(0, 5).map((anime, index) => (
              <Link to={`/anime/${anime.id}`} key={index} className="flex items-center gap-3 group">
                <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded">
                  <img 
                    src={anime.poster} 
                    alt={anime.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm group-hover:text-gray-700 transition-colors">{anime.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-green-800 text-green-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.sub || anime.stats?.rating || "TV"}
                    </span>
                    <span className="bg-pink-800 text-pink-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.dub || anime.stats?.quality || "HD"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {anime.stats?.type || "TV"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Most Popular Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Most Popular</h2>
          <div className="space-y-4">
            {data?.latestEpisodeAnimes?.slice(0, 5).map((anime, index) => (
              <Link to={`/anime/${anime.id}`} key={index} className="flex items-center gap-3 group">
                <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded">
                  <img 
                    src={anime.poster} 
                    alt={anime.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm group-hover:text-gray-700 transition-colors">{anime.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-green-800 text-green-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.sub || anime.stats?.rating || "500"}
                    </span>
                    <span className="bg-pink-800 text-pink-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.dub || anime.stats?.quality || "500"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {anime.stats?.type || "TV"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Most Favorite Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Most Favorite</h2>
          <div className="space-y-4">
            {data?.mostFavoriteAnimes?.slice(0, 5).map((anime, index) => (
              <Link to={`/anime/${anime.id}`} key={index} className="flex items-center gap-3 group">
                <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded">
                  <img 
                    src={anime.poster} 
                    alt={anime.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm group-hover:text-gray-700 transition-colors">{anime.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-green-800 text-green-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.sub || anime.stats?.rating || "12"}
                    </span>
                    <span className="bg-pink-800 text-pink-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.dub || anime.stats?.quality || "12"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {anime.stats?.type || "TV"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Completed Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Latest Completed</h2>
          <div className="space-y-4">
            {data?.latestCompletedAnimes?.slice(0, 5).map((anime, index) => (
              <Link to={`/anime/${anime.id}`} key={index} className="flex items-center gap-3 group">
                <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded">
                  <img 
                    src={anime.poster} 
                    alt={anime.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm group-hover:text-gray-700 transition-colors">{anime.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-green-800 text-green-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.sub || anime.stats?.rating || "26"}
                    </span>
                    <span className="bg-pink-800 text-pink-200 text-xs px-1 rounded">
                      {anime.stats?.episodes?.dub || anime.stats?.quality || "26"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {anime.stats?.type || "TV"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HompageList