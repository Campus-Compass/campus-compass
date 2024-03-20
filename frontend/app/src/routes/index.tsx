import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Recommendations from '../pages/Recommendations'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const Routes = () => {
  const routesForPublic = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/recommendations',
      element: <Recommendations />
    }
  ]

  const router = createBrowserRouter([...routesForPublic])

  return <RouterProvider router={router} />
}

export default Routes
