import React from 'react'
import './app.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/homePage'
import AnimeDetails from './components/AnimeDetails'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </Router>
  )
}

export default App
