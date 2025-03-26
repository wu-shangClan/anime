import { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard';

const AnimeAZList = ({ sortOption = '0-9', initialPage = 1 }) => {
  const [animes, setAnimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnimeList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/v2/hianime/azlist/${sortOption}?page=${currentPage}`
        );
        const data = await response.json();
        if (data.success) {
          setAnimes(data.data.animes);
          setTotalPages(data.data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching anime list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeList();
  }, [sortOption, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnimeAZList;
