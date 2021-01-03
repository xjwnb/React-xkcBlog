import Dashboard from "../views/Dashboard";
import Article from "../views/Article";
import writeBlog from "../views/WriteBlog";
import ArticleEdit from "../views/ArticleEdit";
import AdminInfo from "../views/AdminInfo";
import TagInfo from "../views/TagInfo";
import AdminLinksInfo from "../views/AdminLinksInfo";

export const adminRouter = [
  {
    id: 0,
    pathName: "/admin/dashboard",
    component: Dashboard,
    title: "仪表盘",
    exact: true,
  },
  {
    id: 1,
    pathName: "/admin/article",
    component: Article,
    title: "文章管理",
    exact: true,
  },
  {
    id: 2,
    pathName: "/admin/writeBlog",
    component: writeBlog,
    title: "写博客",
    exact: true,
  },
  {
    id: 3,
    pathName: "/admin/adminInfo",
    component: AdminInfo,
    title: "管理员信息",
    exact: true,
  },
  {
    id: 4,
    pathName: "/admin/tagInfo",
    component: TagInfo,
    title: "标签管理",
    exact: true,
  },
  {
    id: 5,
    pathName: "/admin/linksInfo",
    component: AdminLinksInfo,
    title: "友链信息",
    exact: true,
  },
  {
    id: 100,
    pathName: "/admin/edit/:id",
    component: ArticleEdit,
    exact: true,
  },
];
