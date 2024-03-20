import React from 'react'
import Survey from '../components/Survey'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material'
import '../css/Home.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Home() {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Link to={'/'}>
        <img src={logo} width={50} style={{ position: 'absolute', top: '20px', left: '20px' }}></img>
      </Link>
      <Box m={10} color={theme.palette.primary.main}>
        <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Services Recommendation Survey
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center' }}>
          Please answer the following so we may direct you to the proper services.
        </Typography>
      </Box>
      <Container disableGutters sx={{ bgcolor: 'white', height: '100%', borderRadius: '50px 50px 0 0' }}>
        <Box p={2}>
          <Survey />
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Home
