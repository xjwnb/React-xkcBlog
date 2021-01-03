/*
 * @Author: your name
 * @Date: 2020-05-09 14:54:33
 * @LastEditTime: 2021-01-03 13:39:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\routes\blog.js
 */
/* import {
  Blog,
  BlogList
} from '../views' */
import Blog from '../views/Blog'
import BlogList from '../views/BlogList'
import Links from '@/views/Links'


export const blogRouter = [
  {
    pathName: '/blog',
    component: Blog,
    exact: true
  },
  {
    pathName: '/blog/blogList/:id',
    component: BlogList
  },
  {
    pathName: "/blog/links",
    component: Links
  }
]
