import './App.css'

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useThemeContext } from './hooks/useThemeContext';

//routes
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import Navbar from './components/Navbar';


function App() {

  const { mode } = useThemeContext()

  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id/*" element={<Recipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
