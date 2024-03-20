export interface RecommendationProps {
  question: string
  answer: string
  service: string
}

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
