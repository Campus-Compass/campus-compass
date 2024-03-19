import React from 'react'
import { render } from '@testing-library/react'
import Survey from '../Survey'
test('renders Survey correctly', () => {
  const { container } = render(<Survey />)
  expect(container).toMatchSnapshot()
})
