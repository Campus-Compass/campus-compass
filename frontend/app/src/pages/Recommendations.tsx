import * as React from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import '../css/Recommendations.css'

function Recommendations() {
  return (
    <React.Fragment>
      <Typography variant='h2' component='h2' sx={{ textAlign: 'center' }} m={10}>
        Recommendations
      </Typography>

      <Container maxWidth='xl'>
        <Box mt={10} sx={{ bgcolor: 'white', height: '100vh', borderRadius: '50px 50px 0 0' }} />
      </Container>
    </React.Fragment>
  )
}

export default Recommendations
