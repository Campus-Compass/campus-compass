import * as React from 'react'
import { Typography } from '@mui/material'
import '../css/Recommendations.css'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Recommendation from '../components/Recommendation'

function Recommendations() {
  return (
    <React.Fragment>
      <Box m={10}>
        <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Recommendations
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center' }}>
          Here are a list of services we recommend for you based on your answers.
        </Typography>
      </Box>

      <Container disableGutters sx={{ bgcolor: 'white', height: '100%', borderRadius: '50px 50px 0 0' }}>
        <Box p={6}>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={5}>
            <Recommendation />
            <Recommendation />
          </Box>
          <Typography variant='body2' pt={7} sx={{ textAlign: 'center' }}>
            Feel free to contact any of these services whenever you need assistance.
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Recommendations
