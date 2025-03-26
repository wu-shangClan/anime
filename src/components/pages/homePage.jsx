import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import Slider from '../homepage/Slider'
import Generes from '../homepage/Generes'
import MostPopular from '../homepage/MostPopular'
import HompageList from '../homepage/HompageList'
import Loader from '../utilis/Loader'

const HomePage = () => {
  const navigate = useNavigate()
  const handleClick = (genre) => {
    navigate(`/genre/${genre}?page=1`)
   
  }
  
  const [data, setData] = useState([])
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
    return <Loader />
  }

  return (
    <div className="container py-8 bg-[#dadada]">
      <Navbar />

      <Slider data={data} />

      <div className="container px-4">


        <Generes data={data} handleClick={handleClick} />

        <MostPopular data={data} />

        <HompageList data={data} />

      </div>
    </div>
  )
}

export default HomePage
