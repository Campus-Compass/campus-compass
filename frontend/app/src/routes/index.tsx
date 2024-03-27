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

const routesForPublic: any = []

const routesForAuthenticatedOnly = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/recommendations',
        name: 'Recommendations',
        element: <Recommendations />
      },
      {
        path: '/',
        name: 'Home',
        element: <Home />
      },
      {
        path: '/register',
        name: 'Register Users',
        element: <Register />
      }
    ]
  }
]

const routesForNotAuthenticatedOnly = [
  {
    path: '/login',
    name: 'Login',
    element: <Login />
  }
]

export const routes = [...routesForPublic, ...routesForNotAuthenticatedOnly, ...routesForAuthenticatedOnly]
const navbarRouteNames = ['Home', 'Recommendations', 'Register Users']

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
  const navbarRoutes: any[] = []
  for (const routeName of navbarRouteNames) {
    if (routeName === getCurrentRouteName_(routes, currentPath)) continue
    else {
      navbarRoutes.push(getOtherNavbarRoute(routes, routeName))
    }
  }
  return navbarRoutes
}

function getOtherNavbarRoute(routes: any, routeName: string): any {
  for (const route of routes) {
    if ('children' in route) {
      return getOtherNavbarRoute(route['children'], routeName)
    } else if ('name' in route && route.name === routeName) {
      return route
    }
  }
  return
}

const Routes = () => {
  const { token } = useAuth() as IAuthContext

  const router = createBrowserRouter([...routesForPublic, ...(!token ? routesForNotAuthenticatedOnly : []), ...routesForAuthenticatedOnly])

  return <RouterProvider router={router} />
}

export default Routes
