import React from 'react'
import './app.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/homePage'
import AnimeDetails from './components/AnimeDetails'
import Genres from './components/Genres'
import AnimePage from './components/animePage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/genre/:genre" element={<Genres />} />
        <Route path="/anime" element={<AnimePage />} />
      </Routes>
    </Router>
  )
}

export default App
