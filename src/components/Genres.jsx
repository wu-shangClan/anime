import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AnimeCard from './AnimeCard'

const Genres = () => {
  const [data, setData] = useState({
  animes:[]
  })
  
  const location = useLocation()
  const url = `http://localhost:4000/api/v2/hianime${location.pathname}?page=1`

  const fetchData = async () => {
    try {

      const response = await axios.get(url)
      setData(response.data.data)
    

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Use useEffect for data fetching
  useEffect(() => {
    fetchData()
  }, [])



  
  
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
    </div>     
  
  )
}

export default Genres