import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AnimeCard from './AnimeCard'
import { useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

const HomePage = () => {
  const navigate = useNavigate()
  const handleClick = (genre) => {
    navigate(`/genre/${genre}?page=1`)
   
  }

  
  
  const [data, setData] = useState({
    genres: [],
    latestEpisodeAnimes: [],
    mostPopularAnimes: [],
    trendingAnimes: [],
    latestCompletedAnimes : [],
    azList: []
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

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      
      {/* Genres Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {data?.genres?.map((genre, index) => (
            <button onClick={()=>handleClick(genre)} key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm" >
              {genre} 
            </button>
          ))}
        </div>
      </div>

      <a href="/anime">Anime Page</a>

      {/* Latest Completed Animes Section */}
      {data?.latestCompletedAnimes && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Latest Completed Animes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.latestCompletedAnimes.map((anime, index) => (
              <AnimeCard key={index} anime={anime} showEpisodes={true} />
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
              <AnimeCard key={index} anime={anime} />
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
              <AnimeCard key={index} anime={anime} showEpisodes={true} />
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
              <AnimeCard key={index} anime={anime} showRank={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
