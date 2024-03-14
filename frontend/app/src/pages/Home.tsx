import React from 'react'
import Survey from '../components/Survey'
import Navbar from '../components/Navbar'
import './Home.css'

function Home() {
  return (
    <div className='home'>
      <Navbar /> {/* Include the Navbar component */}
      <h1>Home</h1>
      <Survey />
    </div>
  )
}

export default Home
