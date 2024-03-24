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

const routesForPublic = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  }
]

const routesForAuthenticatedOnly = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/recommendations',
        name: 'Recommendations',
        element: <Recommendations />
      }
    ]
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

export const routes = [...routesForPublic, ...routesForNotAuthenticatedOnly, ...routesForAuthenticatedOnly]
const navbarRouteNames = ['Home', 'Recommendations']

export function getCurrentRouteName(currentPath: string): string {
  return getCurrentRouteName_(routes, currentPath)
}

function getCurrentRouteName_(routes: any, currentPath: string): string {
  for (const route of routes) {
    if ('name' in route && route.path === currentPath) {
      return route.name
    } else if ('children' in route) {
      return getCurrentRouteName_(route['children'], currentPath)
    }
  }
  return ''
}

export function getOtherNavbarRoutes(currentPath: string): any {
  return getOtherNavbarRoutes_(routes, currentPath)
}

export function getOtherNavbarRoutes_(routes: any, currentPath: string): any {
  let navbarRoutes: any[] = []
  for (const routeName of navbarRouteNames) {
    if (routeName === getCurrentRouteName_(routes, currentPath)) continue
    else {
      for (const route of routes) {
        console.log(route)
        if ('children' in route) {
          navbarRoutes = navbarRoutes.concat(getOtherNavbarRoutes_(route['children'], currentPath))
        } else if ('name' in route && route.name === routeName) {
          navbarRoutes.push(route)
        }
      }
    }
  }
  return navbarRoutes
}

const Routes = () => {
  const { token } = useAuth() as IAuthContext

  const router = createBrowserRouter([...routesForPublic, ...(!token ? routesForNotAuthenticatedOnly : []), ...routesForAuthenticatedOnly])

  return <RouterProvider router={router} />
}

export default Routes
