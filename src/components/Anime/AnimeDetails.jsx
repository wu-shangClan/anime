import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../utilis/Loader'
import axios from 'axios'

const AnimeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:4000/api/v2/hianime/anime/${id}`)
        console.log('Full response data:', response.data.data)
        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching anime details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimeDetails()
  }, [id])

  const handleSeasonClick = (season) => {
    navigate(`/anime/${season.id}`)
  }

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-4 flex justify-center items-center h-screen">
        <div className="text-gray-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Error: Anime data not found</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    )
  }

  const { anime, recommendedAnimes, relatedAnimes } = data

  if (!anime || !anime.info) {
    return (
      <Loader />
    )
  }

  return (
    <div className="bg-[#dadada] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Anime Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 bg-white rounded-2xl p-8 shadow-lg">
          {/* Left Column - Poster */}
          <div className="md:col-span-1 group relative">
            <img 
              src={anime.info.poster} 
              alt={anime.info.name}
              className="w-full rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 flex items-center justify-center h-[73%]">
              <button onClick={() => navigate(`/anime/${anime.info.id}/episode/`)} className="bg-white/90 rounded-full p-4 hover:scale-110 transition-transform">
                ▶
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 text-gray-800">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">{anime.info.name}</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">{anime.info.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {anime.info.stats && (
                <>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <span className="font-semibold text-gray-700">Rating:</span> <span className="text-yellow-600">{anime.info.stats.rating}</span>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <span className="font-semibold text-gray-700">Quality:</span> <span className="text-green-600">{anime.info.stats.quality}</span>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <span className="font-semibold text-gray-700">Type:</span> <span className="text-blue-600">{anime.info.stats.type}</span>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <span className="font-semibold text-gray-700">Duration:</span> <span className="text-purple-600">{anime.info.stats.duration}</span>
                  </div>
                  {anime.info.stats.episodes && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <span className="font-semibold text-gray-700">Episodes:</span> Sub: <span className="text-pink-600">{anime.info.stats.episodes.sub}</span>
                      {anime.info.stats.episodes.dub && ` | Dub: ${anime.info.stats.episodes.dub}`}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* More Info Section */}
            {anime.moreInfo && (
              <div className="bg-gray-100 p-6 rounded-2xl">
                <h3 className="font-semibold mb-4 text-xl text-gray-800">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <span className="font-semibold">Aired:</span> {anime.moreInfo.aired}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span> {anime.moreInfo.status}
                  </div>
                  <div>
                    <span className="font-semibold">Studios:</span> {anime.moreInfo.studios}
                  </div>
                  {anime.moreInfo.genres && (
                    <div className="col-span-2">
                      <span className="font-semibold">Genres:</span>{' '}
                      {anime.moreInfo.genres.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Promotional Videos */}
        {anime.info.promotionalVideos?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Promotional Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {anime.info.promotionalVideos.map((video, index) => (
                <div key={index} className="relative aspect-video">
                  <iframe 
                    src={video.source} 
                    alt={video.title || 'Promotional video'} 
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    controls
                    poster={video.thumbnail}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Characters & Voice Actors */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Characters & Voice Actors</h2>
          {anime.info.charactersVoiceActors?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {anime.info.charactersVoiceActors.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  {/* Character Section */}
                  <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.character.poster} 
                        alt={item.character.name} 
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-blue-600">{item.character.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">Character</p>
                      {item.character.cast && (
                        <p className="text-sm text-gray-500 mt-1 italic">
                          {item.character.cast}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Voice Actor Section */}
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.voiceActor.poster} 
                        alt={item.voiceActor.name} 
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-purple-600">{item.voiceActor.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">Voice Actor</p>
                      {item.voiceActor.cast && (
                        <p className="text-sm text-gray-500 mt-1 italic">
                          {item.voiceActor.cast}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No character information available</p>
          )}
        </div>

        {/* Seasons */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Seasons</h2>
          {data.seasons?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {data.seasons.map((season, index) => (
                <div 
                  key={index}
                  onClick={() => handleSeasonClick(season)}
                  className={`p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-shadow duration-300 ${season.isCurrent ? 'bg-blue-50 border border-blue-200' : 'bg-white shadow-lg'}`}
                >
                  <img src={season.poster} alt={season.name} className="w-full rounded-lg" />
                  <p className="font-medium mt-2 text-gray-800">{season.title}</p>
                  {season.isCurrent && (
                    <span className="text-sm text-blue-600">Current Season</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No other seasons available.</p>
          )}
        </div>

        {/* Recommended Animes */}
        {recommendedAnimes?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Recommended</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {recommendedAnimes.map((anime, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                  <img src={anime.poster} alt={anime.name} className="w-full rounded-lg" />
                  <p className="font-medium mt-2 text-gray-800 text-sm">{anime.name}</p>
                  <p className="text-xs text-gray-600">{anime.rating}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Animes */}
        {relatedAnimes?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Related</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {relatedAnimes.map((anime, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                  <img src={anime.poster} alt={anime.name} className="w-full rounded-lg" />
                  <p className="font-medium mt-2 text-gray-800 text-sm">{anime.name}</p>
                  <p className="text-xs text-gray-600">{anime.rating}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnimeDetails