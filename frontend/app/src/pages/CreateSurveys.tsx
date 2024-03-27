import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, TextField, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material'
import { useTheme } from '@mui/material'

interface Question {
  text: string
  choice: string
}

function CreateSurveys() {
  const theme = useTheme()
  const [questions, setQuestions] = useState<Question[]>([])
  useEffect(() => {
    // Replace this with your actual API call
    fetch('/api/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
  }, [])

  const submitForm = () => {
    if (window.confirm('Finalize changes?')) {
      console.log(questions) // replace with call POST to backend
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, { text: '', choice: '' }])
  }

  return (
    <React.Fragment>
      <Box m={10} color={theme.palette.primary.main}>
        <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Create Survey
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center' }}>
          Please create your survey question.
        </Typography>
      </Box>
      <Container disableGutters sx={{ bgcolor: 'white', height: '100%', borderRadius: '50px 50px 0 0' }}>
        <form onSubmit={submitForm}>
          {questions.map((question, index) => (
            <div key={index}>
              <TextField
                label='Question Text'
                value={question.text}
                onChange={(e) => {
                  const newQuestions = [...questions]
                  newQuestions[index].text = e.target.value
                  setQuestions(newQuestions)
                }}
              />
              <RadioGroup
                value={question.choice}
                onChange={(e) => {
                  const newQuestions = [...questions]
                  newQuestions[index].choice = e.target.value
                  setQuestions(newQuestions)
                }}
              >
                <FormControlLabel value='choice1' control={<Radio />} label='Choice 1' />
                <FormControlLabel value='choice2' control={<Radio />} label='Choice 2' />
              </RadioGroup>
            </div>
          ))}
          <Button type='button' onClick={addQuestion}>
            Add Question
          </Button>
          <Button type='submit'>Submit</Button>
        </form>
      </Container>
    </React.Fragment>
  )
}

export default CreateSurveys