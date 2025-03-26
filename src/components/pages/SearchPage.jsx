import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AnimeCard from './Anime/AnimeCard'
import axios from 'axios'

const SearchPage = () => {

    const search = useLocation().search
    const [page , setpage ] = useState(1)

    const [data, setData] = useState({
    animes: [],
    totalPages: 0
    })

    const [loading, setLoading] = useState(false)

    const url = `http://localhost:4000/api/v2/hianime/search${search}&page=${page}`  

    console.log(url)

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
      }, [page])
    
      if (loading) {
        return <div className="p-4">Loading...</div>
      }
  return (
    <div>
       <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data?.animes?.map((anime, index) => (
              <AnimeCard key={index} anime={anime} showEpisodes={true} />
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setpage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 rounded-md text-sm"
          >
            Previous
          </button>
          <span className="mx-2 text-gray-600">Page {page}</span>
          <button
            onClick={() => setpage(prev => prev + 1)}
            disabled={page === data.totalPages}
            className="px-4 py-2 bg-gray-100 rounded-md text-sm"
          >
            Next
          </button>
        </div>
    </div>
  )
}

export default SearchPage