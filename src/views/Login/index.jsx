import React, { useState } from "react";

import { withRouter } from "react-router-dom";

// import post 请求方法
import { login } from "../../requests/login";

import { Form, Input, Button, Checkbox } from "antd";

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
      offset: 4,
      span: 8,
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
          pathname: res.url
        })
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: "请输入你的名字",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入你的密码!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>记得我</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        <Button htmlType="reset" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(Login);
