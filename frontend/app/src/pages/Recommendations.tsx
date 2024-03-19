import React, { useState } from 'react'
import { useEffect } from 'react'
import { useTheme } from '@mui/material'
import '../css/Recommendations.css'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Recommendation from '../components/Recommendation'
import { send_request } from '../utils'
import { RecommendationProps } from '../models'

function Recommendations() {
  const theme = useTheme()
  const [recommendations, setRecommendations] = useState<RecommendationProps[]>([{ question: 'adasd', answer: 'iyuiuy', service: 'qwqwe' }])

  function display_recommendations() {
    send_request('http://goasdogle.com')
      .then((res) => res?.json())
      .then((res) => setRecommendations(res))
    console.log(recommendations)
  }

  useEffect(() => {
    display_recommendations()
  })

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
            {recommendations?.map((rec, index) => <Recommendation key={`rec-${index}`} {...rec} />)}
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
