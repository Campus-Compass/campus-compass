import React, { useState } from 'react'
import { Button, TextField, Select, MenuItem } from '@mui/material'

function CreateSurvey() {
  const [questions, setQuestions] = useState([{ text: '', type: 'text' }])

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'text' }])
  }

  const updateQuestion = (index: number, updatedQuestion: any) => {
    const updatedQuestions = questions.map((question, i) => (i === index ? updatedQuestion : question))
    setQuestions(updatedQuestions)
  }

  const submitForm = () => {
    // Send a POST request to your backend to save the survey
    console.log(questions)
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <TextField
            label='Question Text'
            value={question.text}
            onChange={(e) => updateQuestion(index, { ...question, text: e.target.value })}
          />
          <Select value={question.type} onChange={(e) => updateQuestion(index, { ...question, type: e.target.value })}>
            <MenuItem value='text'>Text</MenuItem>
            <MenuItem value='multipleChoice'>Multiple Choice</MenuItem>
          </Select>
          {question.type === 'multipleChoice' && (
            <TextField
              label='Choices'
              helperText='Separate choices with a comma'
              onChange={(e) => updateQuestion(index, { ...question, choices: e.target.value.split(',') })}
            />
          )}
        </div>
      ))}
      <Button onClick={addQuestion}>Add Question</Button>
      <Button onClick={submitForm}>Submit</Button>
    </div>
  )
}

export default CreateSurvey
