
import Dashboard from '../views/Dashboard'
import Article from '../views/Article'
import writeBlog from '../views/WriteBlog'
import ArticleEdit from '../views/ArticleEdit'
import AdminInfo from '../views/AdminInfo'


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
    pathName: "/admin/adminInfo",
    component: AdminInfo,
    title: "管理员信息",
    exact: true
  },
  {
    id: 4,
    pathName: '/admin/edit/:id',
    component: ArticleEdit,
    exact: true
  },

]