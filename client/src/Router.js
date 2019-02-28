import DashboardPage from './pages/Dashboard'
import LoginPage from './pages/Login'
import DetailPage from './pages/Detail'
import Page500 from './pages/500'
import Page404 from './pages/404'

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
    path: '/detail/:id',
    auth: true,
    component: DetailPage
  },
  {
    path: '/500',
    auth: false,
    component: Page500
  },
  {
    path: '/404',
    auth: false,
    component: Page404
  }
]
