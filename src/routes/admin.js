
import Dashboard from '../views/Dashboard'
import Article from '../views/Article'
import writeBlog from '../views/WriteBlog'
// import ArticleEdit from '../views/ArticleEdit'


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
  }
    
    
    /* ,
  {
    id: 2,
    pathName: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
    icon: 'EditOutlined',
    exact: true
  } */
]