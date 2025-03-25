import { useState , useEffect} from 'react'
import React from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {
  const [suggestions, setSuggestions] = useState([])
  const [isHidden, setIsHidden] = useState(false)

  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const search = e.target.search.value
    createSearchParams({
      search
    })
    navigate('/search?q=' + search)
  }

  const  handlechange = async (e) => {
    
    const key = e.target.value;
    
      try {
      const response = await axios.get(`http://localhost:4000/api/v2/hianime/search/suggestion?q=${key}`)
        setSuggestions(response.data.data)
        
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    }

  return (
    <nav>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search" autoComplete="off" onChange={handlechange} onFocus={() => setIsHidden(true)} onBlur={() => setIsHidden(false)}/>
        <button type="submit" >Search</button>
      </form>
      {
        suggestions.suggestions?.length > 0 &&
          suggestions.suggestions.map((anime)=>(
            <div key={anime.id} className={`${isHidden ? '' : 'hidden'} bg-red-700 `} >
              <p>{anime.name}</p>
            </div>
        ))
      }

    </nav>
  )
}

export default Navbar