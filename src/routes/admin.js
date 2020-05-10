import {
  Admin,
  Article,
  Login,
  NotFound
} from '../views'

export const adminRouter = [
  {
    pathName: '/admin',
    component: Admin,
    exact: true
  },
  {
    pathName: '/admin/Article',
    component: Article
  },
  {
    pathName: '/admin/Login',
    component: Login
  },
  {
    pathName: '/NotFound',
    component: NotFound
  }
]
