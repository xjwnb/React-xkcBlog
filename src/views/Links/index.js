import React, { useState, useEffect } from "react";

// 样式
import "./index.less";

import { Form, Input, Button, message } from "antd";

// import
import { IndexHOC } from "../../components";

// 请求
import { postLinksInfo, getLinksInfo } from "@/requests/links";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 10,
  },
};

function Links() {
  const [form] = Form.useForm();
  const [linksInfo, setLinksInfo] = useState([]);

  // 副作用
  useEffect(() => {
    getLinksInfo().then((res) => {
      if (res.status === 200) {
        setLinksInfo(res.data);
      }
    });
  }, []);

  // 提交友链信息
  const onFinish = (values) => {
    form.resetFields();
    postLinksInfo(values).then((res) => {
      if (res.status === 200) {
        message.success("友链信息已成功提交！");
      } else {
        message.error("友链信息提交失败！");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="blog-links-div">
      Links
      <h2 className="blog=links-title">友链</h2>
      {/* 内容 */}
      <div className="blog-links-content"></div>
      {/* 表单 */}
      <div className="blog-links-form">
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
          {/* 名称 */}
          <Form.Item
            label="名称"
            name="websiteName"
            rules={[
              {
                required: true,
                message: "请输入你的网址名称！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* 网址 */}
          <Form.Item
            label="网址"
            name="website"
            rules={[
              {
                required: true,
                message: "请输入你的网址！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* 头像 */}
          <Form.Item
            label="头像"
            name="authorImgUrl"
            rules={[
              {
                required: true,
                message: "请输入你的网址头像链接！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* 描述 */}
          <Form.Item
            label="描述"
            name="describe"
            rules={[
              {
                required: true,
                message: "请输入你的网址描述信息！",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default IndexHOC(Links);
