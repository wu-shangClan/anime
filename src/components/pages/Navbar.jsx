import React from 'react';
import Search from '../utilis/search';

const Navbar = () => {

  return (
    <nav className="bg-black mb-10 p-4 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-white text-2xl font-bold">AniList</a>
        <a href="/anime" className="text-white hover:text-gray-300 transition-colors">Anime Page</a>
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;  