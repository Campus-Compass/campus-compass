import React from 'react'
import logo from './logo.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Routes>
            <Route path='/' Component={Home} />
            {/* Add more routes as needed */}
          </Routes>
        </header>
      </div>
    </Router>
  )
}

export default App
