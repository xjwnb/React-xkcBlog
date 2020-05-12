/* import {
  Dashboard,
  Article
} from '../views' */
import Dashboard from '../views/Dashboard'
import Article from '../views/Article'

export const adminRouter = [
  {
    pathName: '/admin/dashboard',
    component: Dashboard,
    exact: true
  },
  {
    pathName: '/admin/article',
    component: Article,
    exact: true
  }
]