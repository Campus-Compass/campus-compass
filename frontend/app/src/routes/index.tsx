import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Recommendations from '../pages/Recommendations'
import { useAuth } from '../auth/authProvider'
import { ProtectedRoute } from './ProtectedRoute'
import { IAuthContext } from '../auth/authProvider'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const Routes = () => {
  const { token } = useAuth() as IAuthContext

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

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: []
    }
  ]

  const routesForNotAuthenticatedOnly = [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]

  const router = createBrowserRouter([...routesForPublic, ...(!token ? routesForNotAuthenticatedOnly : []), ...routesForAuthenticatedOnly])

  return <RouterProvider router={router} />
}

export default Routes
