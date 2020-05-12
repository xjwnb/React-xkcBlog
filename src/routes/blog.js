/* import {
  Blog,
  BlogList
} from '../views' */
import Blog from '../views/Blog'
import BlogList from '../views/BlogList'


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
