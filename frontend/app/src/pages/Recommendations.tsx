import * as React from 'react'
import { useTheme } from '@mui/material'
import '../css/Recommendations.css'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Recommendation from '../components/Recommendation'

function Recommendations() {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Box m={10} color={theme.palette.primary.main}>
        <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Recommendations
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center' }}>
          Here are a list of services we recommend for you based on your answers.
        </Typography>
      </Box>

      <Container disableGutters sx={{ bgcolor: 'white', height: '100%', borderRadius: '50px 50px 0 0' }}>
        <Box p={2}>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'}>
            <Recommendation />
            <Recommendation />
          </Box>
          <Typography variant='body2' pt={8} sx={{ textAlign: 'center' }}>
            Feel free to contact any of these services whenever you need assistance.
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Recommendations
