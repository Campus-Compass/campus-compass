import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Question from './Question'

export interface SurveyProps {
  question_text: string
  id: string
  survey_id: string
  answers: {
    recommend_service: boolean
    answer_text: string
    id: string
    question_id: string
  }[]
}

function Survey() {
  const dummySurvey = [
    {
      question_text: 'How are you?',
      id: '1',
      survey_id: '1',
      answers: [
        {
          recommend_service: false,
          answer_text: "I'm fine thank you!",
          id: '1',
          question_id: '1'
        },
        {
          recommend_service: true,
          answer_text: "I'm not feeling well",
          id: '2',
          question_id: '1'
        }
      ]
    }
  ]

  const [survey, setSurvey] = useState<SurveyProps[]>(dummySurvey)

  useEffect(() => {
    // Fetch the survey data from the database when the component mounts
    fetch('/api/survey')
      .then((response) => response.json())
      .then((data) => setSurvey(data))
  }, [])

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    // Post the survey data back to the API
    fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(survey)
    })
      .then((response) => response.json())
      .then(() => {
        // Handle the response data
      })
  }

  if (!survey) {
    return <div>Loading...</div>
  }

  return (
    <Box borderBottom={'solid 2px'} p={4} sx={{ borderImage: 'linear-gradient(to right, rgba(0,0,0,0) 5%, black, rgba(0,0,0,0) 95%) 1' }}>
      <form onSubmit={handleSubmit}>
        {survey?.map((question, index) => <Question key={`rec-${index}`} {...question} />)}
        {survey[0].question_text}
      </form>
    </Box>
  )
}

export default Survey
