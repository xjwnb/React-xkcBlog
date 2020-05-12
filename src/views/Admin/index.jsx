import React, { useEffect, useState } from "react";

import { Route, Switch } from "react-router-dom";

import { adminRouter } from "../../routes";

import { user } from "../../requests/login";

//
/* import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout; */

// 

export default function Admin() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    user().then((res) => {
      setUsername(res.msg.username);
    });
  });

  return (
    <div>
      欢迎{username}
      Admin



      <Switch>
        {
          adminRouter.map((route) => {
            return (
              <Route
                key={route.pathName}
                path={route.pathName}
                render={(routerProps) => {
                  return <route.component {...routerProps} />;
                }}
                exact={route.exact}
              />
            );
          })
        }
      </Switch>
    </div>
  );
}
