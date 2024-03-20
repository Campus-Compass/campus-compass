import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Question from './Question'
import { SurveyProps } from '../models'
import { get_request, post_request } from '../utils'

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
    },
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

  function getSurvey() {
    const survey_ = get_request('/survey')
    return survey_
  }

  async function displaySurvey() {
    const survey_ = await getSurvey()
    if (survey_ !== undefined) setSurvey(survey_)
    else console.log('Survey returned undefined.')
  }

  function submitSurvey() {
    const survey_ = post_request('/survey', JSON.stringify(survey))
    return survey_
  }

  useEffect(() => {
    displaySurvey()
  })

  return (
    <Box>
      <form onSubmit={submitSurvey}>
        {survey?.map((question, index) => <Question key={`rec-${index}`} question={question} index={index + 1} />)}
      </form>
    </Box>
  )
}

export default Survey
