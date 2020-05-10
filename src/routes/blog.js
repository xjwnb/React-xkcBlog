import {
  Blog,
  BlogList
} from '../views'

export const blogRouter = [
  {
    pathName: '/blog',
    component: Blog,
    exact: true
  },
  {
    pathName: '/blog/blogList',
    component: BlogList
  }
]
