import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnimeCard = ({ anime, showEpisodes = false, showRank = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/anime/${anime.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-full h-full flex flex-col rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer bg-white transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] w-full flex-shrink-0">
        <img
          src={anime.poster}
          alt={anime.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {showRank && anime.rank && (
          <div className="absolute top-3 left-3 bg-black/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            #{anime.rank}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-lg md:text-xl mb-1 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
          {anime.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{anime.jname}</p>
        
        <div className="space-y-1.5 mt-auto">
          {anime.type && (
            <p className="text-xs md:text-sm text-gray-600">
              <span className="font-medium">Type:</span> {anime.type}
            </p>
          )}
          {anime.duration && (
            <p className="text-xs md:text-sm text-gray-600">
              <span className="font-medium">Duration:</span> {anime.duration}
            </p>
          )}
          {showEpisodes && anime.episodes && (
            <div className="flex gap-2 text-xs md:text-sm font-medium">
              <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Sub: {anime.episodes.sub || 0}
              </span>
              {anime.episodes.dub && (
                <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Dub: {anime.episodes.dub}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;