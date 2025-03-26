import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../utilis/Loader'

const AnimeEpisode = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all')

    const fetchAnimeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v2/hianime/anime/${id}/episodes`)
            console.log('Full response data:', response.data.data)
            setData(response.data.data)
        } catch (error) {
            console.error('Error fetching anime details:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnimeDetails()
    }, [id])

    const filteredEpisodes = () => {
        if (!data || !data.episodes) return []
        
        switch (activeTab) {
            case 'filler':
                return data.episodes.filter(ep => ep.isFiller)
            case 'canon':
                return data.episodes.filter(ep => !ep.isFiller)
            default:
                return data.episodes
        }
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    if (!data) {
        return (
            <div className="p-4 flex justify-center items-center h-screen">
                <p className="text-red-500">Error loading episodes. Please try again later.</p>
            </div>
        )
    }

    return (
        <div className="bg-[#dadada] min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with anime info */}
                <div className="flex items-center mb-8">
                    <button 
                        onClick={() => navigate(`/anime/${id}`)}
                        className="mr-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    >
                        ←
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {data.title || 'Episodes'} 
                    </h1>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md mb-8">
                    <div className="flex border-b">
                        <button 
                            className={`px-6 py-3 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Episodes ({data.episodes?.length || 0})
                        </button>
                        <button 
                            className={`px-6 py-3 text-sm font-medium ${activeTab === 'canon' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('canon')}
                        >
                            Canon Episodes ({data.episodes?.filter(ep => !ep.isFiller).length || 0})
                        </button>
                        <button 
                            className={`px-6 py-3 text-sm font-medium ${activeTab === 'filler' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('filler')}
                        >
                            Filler Episodes ({data.episodes?.filter(ep => ep.isFiller).length || 0})
                        </button>
                    </div>
                </div>

                {/* Episodes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredEpisodes().map((episode, index) => (
                        <div 
                            key={index}
                            className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${episode.isFiller ? 'border-l-4 border-yellow-400' : 'border-l-4 border-blue-500'}`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-semibold text-gray-800">Episode {episode.number}</span>
                                {episode.isFiller && (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Filler</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{episode.title}</p>
                        </div>
                    ))}
                </div>

                {/* No Episodes Message */}
                {filteredEpisodes().length === 0 && (
                    <div className="bg-white rounded-xl p-8 shadow-md text-center">
                        <p className="text-gray-500">No episodes found for the selected filter.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AnimeEpisode