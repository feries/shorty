import React, { lazy } from 'react'

const LoginPage = lazy(() => import('./pages/Login'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const DetailPage = lazy(() => import('./pages/Detail'))
const Page500 = lazy(() => import('./pages/500'))
const Page404 = lazy(() => import('./pages/404'))

export default [
  {
    path: '/',
    exact: true,
    auth: true,
    component: (props) => <DashboardPage {...props} />
  },
  {
    path: '/login',
    auth: false,
    component: (props) => <LoginPage {...props} />
  },
  {
    path: '/detail/:id',
    auth: true,
    component: (props) => <DetailPage {...props} />
  },
  {
    path: '/500',
    auth: false,
    component: (props) => <Page500 {...props} />
  },
  {
    path: '/404',
    auth: false,
    component: (props) => <Page404 {...props} />
  }
]
