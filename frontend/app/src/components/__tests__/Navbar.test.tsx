import React from 'react'
import { render } from '@testing-library/react'
import Navbar from '../Navbar'
import { MemoryRouter } from 'react-router-dom'
test('renders Navbar correctly', () => {
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
  expect(container).toMatchSnapshot()
})
