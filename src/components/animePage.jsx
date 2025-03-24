import React, { useState } from 'react'
import AnimeAZList from './AnimeAZList'

const animePage = () => {
  const [sortOption, setSortOption] = useState('A')
  return (
    <div>
      {/* A-Z List Section */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Anime A-Z List</h2>
        <div className="flex space-x-2 mb-4">
          {['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0-9'].map((letter) => (
            <button
              key={letter}
              onClick={() => setSortOption(letter)}
              className={`px-3 py-1 rounded ${sortOption === letter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>
      <AnimeAZList sortOption={sortOption} />
    </div>
  )
}

export default animePage