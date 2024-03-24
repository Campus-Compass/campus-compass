import React from 'react'
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { SurveyProps } from '../models'

function Question({
  question,
  questionIndex,
  updateSurveyResponse
}: {
  question: SurveyProps
  questionIndex: number
  updateSurveyResponse: any
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSurveyResponse(question.id, event.target.value)
  }

  return (
    <Box
      borderBottom={'solid 2px'}
      p={4}
      sx={{ width: '90%', borderImage: 'linear-gradient(to right, rgba(0,0,0,0) 3%, black, rgba(0,0,0,0) 97%) 1' }}
    >
      <Typography variant='h5'>Question {questionIndex}</Typography>
      <Typography id='question' variant='body1'>
        {question.question_text}
      </Typography>
      <br />
      <RadioGroup aria-label='survey' name='survey' onChange={handleChange}>
        {question.answers.map((answer, answerIndex) => {
          return <FormControlLabel key={`answer-${answerIndex}`} value={answer.id} control={<Radio />} label={answer.answer_text} />
        })}
      </RadioGroup>
    </Box>
  )
}

export default Question
