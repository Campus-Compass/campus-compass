import React from 'react'
import { render } from '@testing-library/react'
import Navbar from '../Navbar'
test('renders Navbar correctly', () => {
  const { container } = render(<Navbar />)
  expect(container).toMatchSnapshot()
})
