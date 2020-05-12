import React, { useState } from "react";

import { withRouter } from "react-router-dom";

// import post 请求方法
import { login } from "../../requests/login";
// 样式
import "./index.less";

import { Form, Input, Button, Layout } from "antd";
const { Content } = Layout;

function Login(props) {
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

  // 成功登录按钮事件
  const onFinish = (values) => {
    let { username, password } = values;
    let data = {
      username,
      password,
    };
    login(data).then((res) => {
      if (res.status === 200) {
        props.history.push({
          pathname: res.url,
        });
      } else {
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
          <h1 className="font">登录</h1>
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

export default withRouter(Login);
