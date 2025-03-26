import React from 'react'
import './app.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/homepage/homePage'
import AnimeDetails from './components/Anime/AnimeDetails'
import Genres from './components/pages/Genres'
import AnimePage from './components/pages/animePage'
import SearchPage from './components/pages/SearchPage'
import AnimeEpisode from './components/Anime/AnimeEpisode'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/anime/:id',
    element: <AnimeDetails />
  },
  {
    path: '/anime/:id/episode',
    element: <AnimeEpisode />
  },
  {
    path: '/genre/:genre',
    element: <Genres />
  },
  {
    path: '/anime',
    element: <AnimePage />
  },
  {
    path: '/search',
    element: <SearchPage />
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
