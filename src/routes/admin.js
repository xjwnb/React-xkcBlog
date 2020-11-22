/*
 * @Author: your name
 * @Date: 2020-05-11 16:27:09
 * @LastEditTime: 2020-11-22 16:48:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\routes\admin.js
 */

import Dashboard from '../views/Dashboard'
import Article from '../views/Article'
import writeBlog from '../views/WriteBlog'
import ArticleEdit from '../views/ArticleEdit'


export const adminRouter = [
  {
    id: 0,
    pathName: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    exact: true
  },
  {
    id: 1,
    pathName: '/admin/article',
    component: Article,
    title: '文章管理',
    exact: true
  },
  {
    id: 2,
    pathName: '/admin/writeBlog',
    component: writeBlog,
    title: '写博客',
    exact: true
  },
  {
    id: 3,
    pathName: '/admin/edit/:id',
    component: ArticleEdit,
    exact: true
  } 
]