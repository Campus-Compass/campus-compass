import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import Question from './Question'
import { SurveyProps } from '../models'
import { get_request, post_request } from '../utils'
import SendIcon from '@mui/icons-material/Send'

function Survey() {
  const dummySurvey = [
    {
      question_text: 'Are you experiencing difficulties in your personal relationships?',
      id: '1',
      survey_id: '1',
      answers: [
        {
          recommend_service: true,
          answer_text: 'Yes',
          id: '1',
          question_id: '1'
        },
        {
          recommend_service: false,
          answer_text: 'No',
          id: '1',
          question_id: '2'
        }
      ]
    },
    {
      question_text: 'Are you an exchange student?',
      id: '2',
      survey_id: '1',
      answers: [
        {
          recommend_service: true,
          answer_text: 'Yes',
          id: '1',
          question_id: '2'
        },
        {
          recommend_service: false,
          answer_text: 'No',
          id: '2',
          question_id: '2'
        }
      ]
    },
    {
      question_text: 'Have you done your yearly health checkup?',
      id: '3',
      survey_id: '3',
      answers: [
        {
          recommend_service: false,
          answer_text: 'Yes',
          id: '1',
          question_id: '3'
        },
        {
          recommend_service: true,
          answer_text: 'No',
          id: '2',
          question_id: '3'
        }
      ]
    }
  ]

  const navigate = useNavigate()
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
      <form onSubmit={submitSurvey} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px' }}>
        {survey?.map((question, index) => <Question key={`rec-${index}`} question={question} index={index + 1} />)}
        <Button
          onClick={() => navigate('/recommendations')}
          endIcon={<SendIcon />}
          variant='contained'
          color='primary'
          size='large'
          sx={{ margin: '50px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Survey
