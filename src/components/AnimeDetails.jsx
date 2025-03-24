import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AnimeCard from './AnimeCard'


const AnimeDetails = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:4000/api/v2/hianime/anime/${id}`)
        console.log('Full response data:', response.data.data)
        console.log('Character Voice Actors:', response.data.data.anime.info.characterVoiceActor)
        console.log('Seasons:', response.data.data.seasons)
        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching anime details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimeDetails()
  }, [id])

  if (loading || !data) {
    return <div className="p-4">Loading...</div>
  }

  const { anime, mostPopularAnimes, recommendedAnimes, relatedAnimes } = data

  if (!anime || !anime.info) {
    return <div className="p-4">Error: Anime data not found</div>
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Main Anime Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Poster */}
        <div className="md:col-span-1">
          <img 
            src={anime.info.poster} 
            alt={anime.info.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{anime.info.name}</h1>
          <p className="text-gray-700 mb-6">{anime.info.description}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {anime.info.stats && (
              <>
                <div>
                  <span className="font-semibold">Rating:</span> {anime.info.stats.rating}
                </div>
                <div>
                  <span className="font-semibold">Quality:</span> {anime.info.stats.quality}
                </div>
                <div>
                  <span className="font-semibold">Type:</span> {anime.info.stats.type}
                </div>
                <div>
                  <span className="font-semibold">Duration:</span> {anime.info.stats.duration}
                </div>
                {anime.info.stats.episodes && (
                  <div>
                    <span className="font-semibold">Episodes:</span> Sub: {anime.info.stats.episodes.sub}
                    {anime.info.stats.episodes.dub && ` | Dub: ${anime.info.stats.episodes.dub}`}
                  </div>
                )}
              </>
            )}
          </div>

          {/* More Info Section */}
          {anime.moreInfo && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4">
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Promotional Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anime.info.promotionalVideos.map((video, index) => (
              <div key={index} className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title || 'Promotional video'} 
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/80 rounded-full p-3">
                    ▶
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Characters & Voice Actors */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Characters & Voice Actors</h2>
        {anime.info.charactersVoiceActors?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {anime.info.charactersVoiceActors.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
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
          <p className="text-gray-500">No character information available yet.</p>
        )}
      </div>

      {/* Seasons */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Seasons</h2>
        {data.seasons?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {data.seasons.map((season, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${season.isCurrent ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}
              >
                <img src={season.poster} alt={season.name} className="w-full rounded-lg" />
                <p className="font-medium mt-2">{season.title}</p>
                {season.isCurrent && (
                  <span className="text-sm text-blue-600">Current Season</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No other seasons available.</p>
        )}
      </div>
    </div>
  )
}

export default AnimeDetails 