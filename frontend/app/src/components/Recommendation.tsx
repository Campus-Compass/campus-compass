import React from 'react'
import { Typography, Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import EmailIcon from '@mui/icons-material/Email'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'

const Recommendation: React.FC = () => {
  return (
    <Box>
      <Typography variant='h5'>Question 1</Typography>
      <Typography id='question' variant='body1'>
        In case you encounter IT-related issues, would you know how to reach out to IT services for support?
      </Typography>
      <br />
      <Typography variant='body1'>
        <span style={{ textDecoration: 'underline', marginRight: '5px' }}>You answered:</span>
        <span id='question-answer'>No, I don't. Please provide me some information on how to.</span>
      </Typography>
      <br />
      <Typography variant='h5'>We recommend this service:</Typography>
      <Box p={3} sx={{ backgroundColor: grey[400], borderRadius: '20px', textAlign: 'center' }}>
        <Typography variant='h4'>IT</Typography>
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
