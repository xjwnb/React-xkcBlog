import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import {
  adminRouter,
  blogRouter
} from './routes'

// antd组件设置为中文
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/" component={App} exact />
          {
            adminRouter.map(item => {
              return <Route key={item.pathName} path={item.pathName} component={item.component} exact={item.exact} />
            })
          },
          {
            blogRouter.map(item => {
              return <Route key={item.pathName} path={item.pathName} component={item.component} exact={item.exact} />
            })
          }
          <Redirect to="/NotFound" />
        </Switch>
      </Router>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
