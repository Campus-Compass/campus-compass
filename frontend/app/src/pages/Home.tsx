import React from 'react'
import Navbar from '../components/Navbar'
import Survey from '../components/Survey'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container'
import { useTheme } from '@mui/material'
import '../css/Home.css'

function Home() {
  const theme = useTheme()
  return (
    <div className='home'>
      <Navbar />
      <React.Fragment>
        <Box m={10} color={theme.palette.primary.main}>
          <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 500 }}>
            Services Recommendation Survey
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            Please answer the following so we may direct you to the proper services.
          </Typography>
        </Box>
      </React.Fragment>
      {<Survey />}
    </div>
  )
}

export default Home
