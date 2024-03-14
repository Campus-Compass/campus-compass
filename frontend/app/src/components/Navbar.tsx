// Navbar.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Resource Recommender</Link>
        </li>
        <li>
          <Link to='/services'>All Services</Link>
        </li>
        <li>
          <Link to='/serviceMap'>Service Map</Link>
        </li>
        <li>
          <Link to='/calendar'>Event Calendar</Link>
        </li>
        <li>
          <Link to='/feedback'>Give Feedback</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
