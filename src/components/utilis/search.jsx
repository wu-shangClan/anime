import React, { useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom';
import axios from 'axios';

const search = () => {

    const [suggestions, setSuggestions] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
  
    const navigate = useNavigate();
  
    const handleSearch = (e) => {
      e.preventDefault();
      const search = e.target.search.value;
      createSearchParams({
        search
      });
      navigate('/search?q=' + search);
    };
  
    const handlechange = async (e) => {
      const key = e.target.value;
      try {
        const response = await axios.get(`http://localhost:4000/api/v2/hianime/search/suggestion?q=${key}`);
        setSuggestions(response.data.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
  
    const handleSuggestionClick = (anime) => {
      navigate(`/anime/${anime.id}`);
    };

  return (
    <>
        <form onSubmit={handleSearch} className="flex items-center justify-end space-x-4">
          <div className="relative">
            <input 
              type="text" 
              name="search" 
              placeholder="Search anime..." 
              autoComplete="off" 
              onChange={handlechange} 
              onFocus={() => setIsHidden(true)} 
              onBlur={() => setTimeout(() => setIsHidden(false), 1000)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            {suggestions.suggestions?.length > 0 && (
              <div className={`${isHidden ? '' : 'hidden'} absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-50`}>
                {suggestions.suggestions.map((anime) => (
                  <div 
                    key={anime.id} 
                    className="p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(anime)}
                  >
                    <p className="text-white">{anime.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            Search
          </button>
        </form>
    </>
  )
}

export default search