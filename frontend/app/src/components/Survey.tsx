import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import Question from './Question'
import { RecommendationProps, SurveyProps, SurveyResponse } from '../models'
import { get_request, post_request } from '../utils'
import SendIcon from '@mui/icons-material/Send'

function Survey() {
  const navigate = useNavigate()
  const [survey, setSurvey] = useState<SurveyProps[]>([])
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

  async function submitSurvey(event: any) {
    event.preventDefault()
    console.log(surveyResponse)
    const recommendations: RecommendationProps = await post_request('/survey', JSON.stringify(surveyResponse))
    navigate('/recommendations', { state: { recommendations } })
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
