import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import Question from './Question'
import { SurveyProps, SurveyResponse } from '../models'
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
          id: '2',
          question_id: '1'
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
          id: '3',
          question_id: '2'
        },
        {
          recommend_service: false,
          answer_text: 'No',
          id: '4',
          question_id: '2'
        }
      ]
    },
    {
      question_text: 'Have you done your yearly health checkup?',
      id: '3',
      survey_id: '1',
      answers: [
        {
          recommend_service: false,
          answer_text: 'Yes',
          id: '5',
          question_id: '3'
        },
        {
          recommend_service: true,
          answer_text: 'No',
          id: '6',
          question_id: '3'
        }
      ]
    }
  ]

  const navigate = useNavigate()
  const [survey, setSurvey] = useState<SurveyProps[]>(dummySurvey)
  const [surveyResponse, setSurveyResponse] = useState<SurveyResponse[]>([])

  async function getSurvey() {
    const survey_ = await get_request('/survey')
    return survey_
  }

  async function displaySurvey() {
    const survey_ = await getSurvey()
    if (survey_ !== undefined) setSurvey(survey_)
    else console.log('Survey returned undefined.')
  }

  function submitSurvey(event: any) {
    event.preventDefault()
    console.log(surveyResponse)
    navigate('/recommendations')
    const survey_ = post_request('/survey', JSON.stringify(survey))
    return survey_
  }

  function updateSurveyResponse(question_id: string, answer_id: string) {
    const answeredQuestion = {
      question_id: question_id,
      answer_id: answer_id
    }
    const surveyResponse_ = surveyResponse.filter((question) => question.question_id != question_id)
    surveyResponse_.push(answeredQuestion)
    setSurveyResponse(surveyResponse_)
  }

  useEffect(() => {
    displaySurvey()
  }, [])

  return (
    <Box>
      <form onSubmit={submitSurvey} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px' }}>
        {survey?.map((question, index) => (
          <Question key={`rec-${index}`} question={question} questionIndex={index + 1} updateSurveyResponse={updateSurveyResponse} />
        ))}
        <Button type='submit' endIcon={<SendIcon />} variant='contained' color='primary' size='large' sx={{ margin: '50px' }}>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Survey
