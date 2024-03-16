import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

const Routes = () => {
  const routesForPublic = [
    {
      path: '/',
      element: <Home />
    }
  ]

  const router = createBrowserRouter([...routesForPublic])

  return <RouterProvider router={router} />
}

export default Routes
