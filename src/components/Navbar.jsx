import React from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'

// pass the props to next page with useNavigate
const Navbar = () => {
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    const search = e.target.search.value
    createSearchParams({
      search
    })
    navigate('/search?q=' + search)
  }
  return (
    <nav>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search" />
        <button type="submit" >Search</button>
      </form>

    </nav>
  )
}

export default Navbar