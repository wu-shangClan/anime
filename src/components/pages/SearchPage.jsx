import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AnimeCard from '../Anime/AnimeCard'
import axios from 'axios'

const SearchPage = () => {
    const search = useLocation().search
    const [page, setPage] = useState(1)
    const [data, setData] = useState({
        animes: [],
        totalPages: 0
    })
    const [loading, setLoading] = useState(false)

    const url = `http://localhost:4000/api/v2/hianime/search${search}&page=${page}`  

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(url)
            setData(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [page, search])
    
    return (
        <div className="min-h-screen bg-[#dadada] p-4 md:p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Search Results</h1>
                <p className="text-gray-600 mt-2">Found {data?.animes?.length > 0 ? `${data.animes.length} results` : 'no results'} for your search</p>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {data?.animes?.length > 0 ? (
                        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {data.animes.map((anime, index) => (
                                    <AnimeCard key={index} anime={anime} showEpisodes={true} />
                                ))}
                            </div>
                            
                            {/* Pagination */}
                            <div className="flex justify-center items-center mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                    disabled={page === 1}
                                    className={`px-4 py-2 rounded-md text-sm mr-3 transition-all ${
                                        page === 1 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                                    }`}
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-700 font-medium">
                                    Page {page} of {data.totalPages || 1}
                                </span>
                                <button
                                    onClick={() => setPage(prev => prev + 1)}
                                    disabled={page === data.totalPages}
                                    className={`px-4 py-2 rounded-md text-sm ml-3 transition-all ${
                                        page === data.totalPages 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-8 shadow-md text-center">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No results found</h2>
                            <p className="text-gray-600">Try different search terms or browse our anime collection</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default SearchPage