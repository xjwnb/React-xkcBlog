import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";

import { connect } from 'react-redux'

import { successLogin, failLogin } from '../../store/actions/login'

// import post 请求方法
import { login, user } from "../../requests/login";
// 样式
import "./index.less";

import { Form, Input, Button, Layout } from "antd";
const { Content } = Layout;

function Login(props) {
  // console.log(props);
  
  const [form] = Form.useForm();
  const [layout] = useState({
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  });

  const [tailLayout] = useState({
    wrapperCol: {
      offset: 6,
      span: 16,
    },
  });

  useEffect(() => {
    // 判断是否已经登录（登录的cookie未过期）
    let timer = null;
    // 判断是否已经登录请求
    user().then(res => {
      // 如果没有登录
      if (res.msg.username === undefined) {
        return 
      }
      // 已经登录，则跳转页面
      timer = setTimeout(() => {
        props.history.push({
          pathname: '/admin'
        });
      }, 1000);
    })
    return () => {
      clearTimeout(timer);
    }
  }, [props.history])

  // 成功登录按钮事件
  const onFinish = (values) => {
    let { username, password } = values;
    let data = {
      username,
      password,
    };
    login(data).then((res) => {
      if (res.status === 200) {
        // console.log(res)
        // props.successLogin()
        props.history.push({
          pathname: res.url,
        });
        return
      } else {
        // props.failLogin()
        props.history.push({
          pathname: res.url,
        });
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  // form布局
  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 14 },
    },
  };
  return (
    <div className="login">
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <Content>
          <h1 className="font">管理员登录</h1>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入你的名字",
              },
            ]}
            {...formItemLayout}
          >
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>
        </Content>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入你的密码!",
            },
          ]}
          {...formItemLayout}
        >
          <Input.Password placeholder="请输入密码" size="large" />
        </Form.Item>
        <Form.Item {...tailLayout} className="Btn">
          <Button
            type="primary"
            size="large"
            shape="round"
            // block
            htmlType="submit"
          >
            登录
          </Button>

          <Button
            htmlType="reset"
            size="large"
            shape="round"
            // block
            onClick={onReset}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    login: state.isLogin
  }
}

export default connect(mapStateToProps,{ successLogin, failLogin })(withRouter(Login))
