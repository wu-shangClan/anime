import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";

const Generes = ({ data, handleClick }) => {
  const [showAll, setShowAll] = useState(false);
  const genres = data?.genres || [];
  const visibleGenres = showAll ? genres : genres.slice(0, 4);

  return (
    <div className="my-8 flex justify-center">
      <div className="flex flex-wrap gap-2">
        {visibleGenres.map((genre, index) => (
          <button 
            onClick={() => handleClick(genre)} 
            key={index} 
            className="bg-gray-100 hover:bg-black hover:text-white transition-colors px-3 py-1 rounded-full text-sm"
          >
            {genre}
          </button>
        ))}
        {genres.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gray-100 hover:bg-black hover:text-white transition-colors px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {showAll ? 'Show Less' : <><span><FaPlus/></span> More</>}
          </button>
        )}
      </div>
    </div>
  );
};

export default Generes;