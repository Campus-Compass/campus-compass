import React from 'react'
import { Typography, Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import EmailIcon from '@mui/icons-material/Email'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import { RecommendationProps } from '../models'

const Recommendation: React.FC<RecommendationProps> = (rec: RecommendationProps) => {
  return (
    <Box borderBottom={'solid 2px'} p={4} sx={{ borderImage: 'linear-gradient(to right, rgba(0,0,0,0) 5%, black, rgba(0,0,0,0) 95%) 1' }}>
      <Typography variant='h5'>Question 1</Typography>
      <Typography id='question' variant='body1'>
        {rec.question}
      </Typography>
      <br />
      <Typography variant='body1'>
        <span style={{ textDecoration: 'underline', marginRight: '5px' }}>You answered:</span>
        <span id='question-answer'>{rec.answer}</span>
      </Typography>
      <br />
      <Typography variant='h5'>We recommend this service:</Typography>
      <Box p={3} sx={{ backgroundColor: grey[400], borderRadius: '20px', textAlign: 'center' }}>
        <Typography variant='h4'>{rec.service}</Typography>
        <Typography variant='body1'>
          <EmailIcon sx={{ position: 'relative', top: '5px' }} /> it@mahidol.ac.th
        </Typography>
        <Typography variant='body1'>
          <PhoneInTalkIcon sx={{ position: 'relative', top: '5px' }} /> +66 0283756381
        </Typography>
      </Box>
    </Box>
  )
}

export default Recommendation
