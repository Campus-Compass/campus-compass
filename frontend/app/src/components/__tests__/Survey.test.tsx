import React from 'react'
import { render } from '@testing-library/react'
import Survey from '../Survey'

const mockUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate
}))

test('renders Survey correctly', () => {
  const { container } = render(<Survey />)
  expect(container).toMatchSnapshot()
})
