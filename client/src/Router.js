import { lazy } from 'react'

const LoginPage = lazy(() => import('./pages/Login'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const DetailPage = lazy(() => import('./pages/Detail'))

export default [
  {
    path: '/',
    exact: true,
    auth: true,
    component: DashboardPage
  },
  {
    path: '/login',
    auth: false,
    component: LoginPage
  },
  {
    path: '/detail',
    auth: true,
    component: DetailPage
  }
]
