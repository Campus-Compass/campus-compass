export interface RecommendationProps {
  question: string
  answer: string
  service: {
    address: string
    email: string
    id: number
    phone_number: string
    service_name: string
    uesr_id: string
    website_url: string
  }
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

export interface SurveyResponse {
  question_id: string
  answer_id: string
}
