import React from 'react'
import './app.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/homePage'
import AnimeDetails from './components/AnimeDetails'
import Genres from './components/Genres'
import AnimePage from './components/animePage'
import SearchPage from './components/SearchPage'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/anime/:id',
    element: <AnimeDetails />
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
