import React, { useEffect } from "react";

import { withRouter } from 'react-router-dom'

import "./index.less";

import { Layout, Menu, Button } from "antd";

// 请求
import { loginOut } from '../../requests/admin'

import {
  UserOutlined,
  DashboardOutlined, 
  UnorderedListOutlined, 
  EditOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const icons = [<DashboardOutlined />, <UnorderedListOutlined />, <EditOutlined/>]

function Frame(props) {
  // 点击menu按钮
  const handleMenu = ({keyPath}) => {
    props.history.push(keyPath[0])
  }
  useEffect(() => {
    console.log("Frame：props" ,props);
    let timer = null;
    if (!props.username) {
      timer = setTimeout(() => {
        props.history.push("/login");
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [props])


  // 登录注销
  const loginOutHandler = () => {
    loginOut().then(res => {
      console.log("loginOut", res);
      if (res.status === 200) {
        props.history.push("/login");
      }
    })
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo">{props.username}</div>
        <div className="header-right">
          <Button onClick={loginOutHandler}>注销</Button>
        </div>
      </Header>
      <Layout className="content">
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={props.location.pathname}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleMenu}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title={props.username}>
              {
                props.menus.slice(0, props.menus.length - 1).map(menu => {
                  return (
                    <Menu.Item key={menu.pathName} >{icons[menu.id]} {menu.title}</Menu.Item>
                  )
                })
              }
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withRouter(Frame)
