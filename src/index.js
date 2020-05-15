import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'

import store from './store'
// import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Admin } from "./views";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { baseRouter, blogRouter } from "./routes";

// antd组件设置为中文
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            path="/"
            render={(routerProps) => {
              return <App {...routerProps} />;
            }}
            exact
          />
          <Route
            path="/admin"
            render={(routerProps) => {
              // 权限认证
              return <Admin {...routerProps} />;
            }}
            
          />
          {
            baseRouter.map((item) => {
              return (
                <Route
                  key={item.pathName}
                  path={item.pathName}
                  component={item.component}
                  exact={item.exact}
                />
              );
            })
          }
          ,
          {blogRouter.map((item) => {
            return (
              <Route
                key={item.pathName}
                path={item.pathName}
                component={item.component}
                exact={item.exact}
              />
            );
          })}
          <Redirect to="/NotFound" />
        </Switch>
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
