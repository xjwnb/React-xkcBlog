import Login from '../views/Login'
import NotFound from '../views/NotFound'

export const baseRouter = [
  {
    pathName: '/login',
    component: Login,
    exact: true
  },
  {
    pathName: '/NotFound',
    component: NotFound
  }
]

