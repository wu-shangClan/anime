import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomePage = () => {
  const [data, setData] = useState({
    genres: [],
    latestEpisodeAnimes: [],
    mostPopularAnimes: [],
    trendingAnimes: [],
    latestCompletedAnimes: []
  })
  const [loading, setLoading] = useState(true)
  const url = 'http://localhost:4000/api/v2/hianime/home'

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(url)
      console.log(response.data.data)
      setData(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Use useEffect for data fetching
  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Home Page</h1>
      
      {/* Genres Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {data?.genres?.map((genre, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Latest Completed Animes Section */}
      {data?.latestCompletedAnimes && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Latest Completed Animes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.latestCompletedAnimes.map((anime, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-3 aspect-h-4 mb-3">
                  <img 
                    src={anime.poster} 
                    alt={anime.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-lg mb-2">{anime.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{anime.jname}</p>
                <p className="text-sm text-gray-600">Type: {anime.type}</p>
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest Episodes Section */}
      {data?.latestEpisodeAnimes && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Latest Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.latestEpisodeAnimes.map((anime, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-3 aspect-h-4 mb-3">
                  <img 
                    src={anime.poster} 
                    alt={anime.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-lg mb-2">{anime.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{anime.jname}</p>
                <p className="text-sm text-gray-600">Duration: {anime.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Most Popular Section */}
      {data?.mostPopularAnimes && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Most Popular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.mostPopularAnimes.map((anime, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-3 aspect-h-4 mb-3">
                  <img 
                    src={anime.poster} 
                    alt={anime.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-lg mb-2">{anime.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{anime.jname}</p>
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Section */}
      {data?.trendingAnimes && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.trendingAnimes.map((anime, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-3 aspect-h-4 mb-3">
                  <img 
                    src={anime.poster} 
                    alt={anime.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-lg mb-2">{anime.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{anime.jname}</p>
                <div className="mt-2 text-sm">
                  <span className="text-purple-600">
                    Rank: #{anime.rank}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
