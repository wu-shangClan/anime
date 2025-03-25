import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AnimeCard from './AnimeCard'

const Genres = () => {
  const [data, setData] = useState({
  animes:[]
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  
  const location = useLocation()
  const url = `http://localhost:4000/api/v2/hianime${location.pathname}?page=${currentPage}`

  const fetchData = async () => {
    try {

      const response = await axios.get(url)
      setData(response.data.data)
      setTotalPages(response.data.data.totalPages)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Use useEffect for data fetching
  useEffect(() => {
    fetchData()
  }, [currentPage])



  
  
  return (
    
    <div>
   {data?.animes && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3"></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.animes.map((anime, index) => (
              <AnimeCard key={index} anime={anime} />
            ))}
          </div>
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || isLoading }
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>     
  
  )
}

export default Genres