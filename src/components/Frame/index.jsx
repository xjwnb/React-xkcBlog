import React, { useEffect, useState } from "react";

import { withRouter } from 'react-router-dom'

import "./index.less";

import { Layout, Menu, Button } from "antd";

// 请求
import { loginOut } from '../../requests/admin'

import {
  UserOutlined,
  DashboardOutlined, 
  UnorderedListOutlined, 
  EditOutlined,
  SolutionOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const icons = [<DashboardOutlined />, <UnorderedListOutlined />, <EditOutlined/>, <SolutionOutlined />]

function Frame(props) {

  const [navMenus, setNavMenus] = useState([]);
  // 点击menu按钮
  const handleMenu = ({keyPath}) => {
    props.history.push(keyPath[0])
  }
  useEffect(() => {
    console.log("Frame：props" ,props);
    let oldMenus = props.menus;
    console.log(oldMenus);
    let newMenus = oldMenus.filter(item => {
      if (item.title) {
        return true;
      }
      return false;
    })
    console.log(newMenus);
    setNavMenus(newMenus)
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
      <div className="content-layout">
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={props.location.pathname}
            defaultOpenKeys={["sub1"]}
            style={{ borderRight: 0 }}
            onClick={handleMenu}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title={props.username}>
              {
                navMenus.map(menu => {
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
      </div>
    </Layout>
  );
}

export default withRouter(Frame)
