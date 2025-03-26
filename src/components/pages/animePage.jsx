import React, { useState } from 'react'
import AnimeAZList from '../Anime/AnimeAZList'

const AnimePage = () => {
  const [sortOption, setSortOption] = useState('A')
  return (
    <div className="min-h-screen bg-[#dadada] p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Anime Directory</h1>
        <p className="text-gray-600 mt-2">Browse anime alphabetically by first letter</p>
      </div>
      
      {/* A-Z List Section */}
      <section className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Anime A-Z List</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0-9'].map((letter) => (
            <button
              key={letter}
              onClick={() => setSortOption(letter)}
              className={`px-4 py-2 rounded-md transition-all ${
                sortOption === letter 
                  ? 'bg-blue-500 text-white font-medium shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <AnimeAZList sortOption={sortOption} />
        </div>
      </section>
    </div>
  )
}

export default AnimePage