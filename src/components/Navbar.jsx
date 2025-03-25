import { useState , useEffect} from 'react'
import React from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {
  const [suggestions, setSuggestions] = useState([])

  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    const search = e.target.search.value
    createSearchParams({
      search
    })
    navigate('/search?q=' + search)
  }

  useEffect(()=>{},[suggestions])

  const  handlechange = async (e) => {
    const key = e.target.value;
    
      try {
      const response = await axios.get(`http://localhost:4000/api/v2/hianime/search/suggestion?q=${key}`)
        setSuggestions(response.data.data)
        console.log(response.data.data);
        
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
  }


  return (
    <nav>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search" autoComplete="off" onChange={handlechange} />
        <button type="submit" >Search</button>
      </form>
      {
        suggestions.length > 0 &&
        suggestions.map((anime)=>
        {
          <div>
            <p>{anime.name}</p>
          </div>
        }
        )
      }

    </nav>
  )
}

export default Navbar