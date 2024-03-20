import React from 'react'
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
// import { grey } from '@mui/material/colors'

function Question(question: { question_text: string; answers: { answer_text: string; recommend_service: boolean }[] }) {
  const [selectedValue, setSelectedValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value)
  }

  return (
    <Box borderBottom={'solid 2px'} p={4} sx={{ borderImage: 'linear-gradient(to right, rgba(0,0,0,0) 5%, black, rgba(0,0,0,0) 95%) 1' }}>
      <Typography variant='h5'>Question 1</Typography>
      <Typography id='question' variant='body1'>
        {question.question_text}
      </Typography>
      <br />
      <RadioGroup aria-label='survey' name='survey' value={selectedValue} onChange={handleChange}>
        {question.answers.map((answer, index) => {
          return <FormControlLabel key={`answer-${index}`} value={answer.answer_text} control={<Radio />} label={answer.answer_text} />
        })}
      </RadioGroup>
    </Box>
  )
}

export default Question
