import DashboardPage from './pages/Dashboard'
import LoginPage from './pages/Login'
import DetailPage from './pages/Detail'

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
