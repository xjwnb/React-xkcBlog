import React, { useState, useEffect, useRef } from "react";

// 样式
import "./index.less";

import { Form, Input, Button, message, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

// import
import { IndexHOC } from "../../components";

// 请求
import { postLinksInfo, getAllPassLinksInfo } from "@/requests/links";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 15,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 15,
  },
};

function Links() {
  const [form] = Form.useForm();
  // const [linksInfo, setLinksInfo] = useState([]);
  // 已通过的友链信息
  const [allPassLinksInfo, setAllPassLinksInfo] = useState([]);

  // 副作用
  useEffect(() => {
    // 获取通过的数据
    getAllPassLinksInfo().then((res) => {
      if (res.status === 200) {
        setAllPassLinksInfo(res.data);
        let blogLinkDiv = document.getElementsByClassName("blog-links-bg");
        for (let i = 0, l = blogLinkDiv.length; i < l; i++) {
          let blogLink = blogLinkDiv[i];
          let imgUrl = blogLink.dataset.imgurl;
          blogLink.style.backgroundImage = `url(${imgUrl})`;
        }
      }
    });
    return () => {};
  }, []);

  // 提交友链信息
  const onFinish = (values) => {
    form.resetFields();
    postLinksInfo(values).then((res) => {
      if (res.status === 200) {
        message.success("友链信息已成功提交！,作者会尽快审核，并通过。");
      } else {
        message.error("友链信息提交失败！");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 跳转到目标 link
  const getToLinkHandle = (href) => {
    window.location.href = href;
  };

  return (
    <div className="blog-links-div">
      <h2 className="blog=links-title">友链</h2>
      {/* 内容 */}

      <div className="blog-links-content">
        {allPassLinksInfo &&
          allPassLinksInfo.map((link) => {
            return (
              <div key={link.id} className="blog-link-div">
                <div
                  className="blog-links-bg"
                  data-imgurl={link.authorImgUrl}
                ></div>
                <div className="blog-link-logo">
                  <Avatar
                    src={link.authorImgUrl}
                    size={64}
                    icon={<UserOutlined />}
                  />
                </div>
                <div className="blog-link-content">
                  <div className="blog-link-name">
                    <a href={link.website} target="_blank">
                      {link.websiteName}
                    </a>
                  </div>
                  <div className="blog-link-describe">{link.describe}</div>
                </div>
              </div>
            );
          })}
      </div>
      {/* 表单 */}
      <div className="blog-links-form">
        <Divider orientation="left">提交信息</Divider>
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
            <Input placeholder="大佬，请输入你的网站名称" />
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
            <Input placeholder="大佬，请输入你的网站地址（http 或 https 开头）" />
          </Form.Item>

          {/* 头像 */}
          <Form.Item
            label="logo 图片"
            name="authorImgUrl"
            rules={[
              {
                required: true,
                message: "请输入你的网址头像链接！",
              },
            ]}
          >
            <Input placeholder="大佬，请输入你的logo网站（http 或 https 开头）" />
          </Form.Item>

          {/* 描述 */}
          <Form.Item
            label="描述"
            name="describe"
            rules={[
              {
                required: true,
                message: "请输入你的网站描述信息！",
              },
            ]}
          >
            <Input.TextArea placeholder="大佬，请输入你的网址描述" />
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
