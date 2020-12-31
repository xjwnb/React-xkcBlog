import React, { useEffect, useState } from "react";

import { Box } from "@/components";

import { getAdminInfo, postAdminInfo } from "@/requests/admin";

// 引入样式
import "./index.less";

import { Button, Modal, Form, Input, Upload, Avatar } from "antd";
import { PlusOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";

export default function AdminInfo() {
  const [adminInfo, setAdminInfo] = useState({});
  const [technologyStack, setTechnologyStack] = useState([]);
  const [visibleModal, setVisibleModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState("");
  const [previewTitle, setpreviewTitle] = useState("");
  const [fileList, setfileList] = useState([]);

  // 表单默认信息
  const [initialValue, setInitialValue] = useState({});

  useEffect(() => {
    getAdminInfo().then((res) => {
      if (res.status === 200) {
        setAdminInfo(res.data);
        let avatar = res.data.avatar;
        setTechnologyStack(res.data.technologyStack);
        setfileList([
          {
            uid: "-1",
            name: "avatar.png",
            status: "done",
            url: avatar
          }
        ])
      }
    });
  }, []);

  // 编辑信息按钮事件
  const editAdminInfo = () => {
    // 显示 model
    setVisibleModel(true);
    // 表单默认数据
    setInitialValue(adminInfo);
  };

  const handleOk = () => {
    setVisibleModel(false);
  };

  const handleCancel = () => {
    setVisibleModel(false);
  };

  // 提交表单
  const onFinish = (formValues) => {
    let avatar = fileList[0].thumbUrl;
    let copyForm = Object.assign({}, formValues);
    copyForm._id = adminInfo._id;
    if (fileList) {
      let element = document.getElementsByClassName(
        "ant-upload-list-picture-card-container"
      );
      let lastEle = element[element.length - 1];
      if (lastEle) {
        let href = lastEle
          .getElementsByClassName("ant-upload-list-item-thumbnail")[0]
          .getAttribute("href");
        copyForm.avatar = href;
      }
    }
    if (typeof copyForm.technologyStack === "string") {
      let technology = copyForm.technologyStack;
      let technologyArray = technology.split(",");
      copyForm.technologyStack = technologyArray;
    }
    copyForm.codeAge = Number(copyForm.codeAge);
    // 发送请求
    postAdminInfo(copyForm).then((res) => {
      if (res.status === 200) {
        setVisibleModel(false);
        setAdminInfo(copyForm);
      }
    });
  };

  const onFinishFailed = () => {
    console.log(".....");
  };

  // 表单布局
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  // 头像
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadhandleCancel = () => {
    setpreviewVisible(false);
  };

  const handlePreview = async (file) => {
    /* if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    } */
    console.log(file);
    /* this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    }); */
  };

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setfileList(fileList);
  };

  const getValueFromEvent = function (e) {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Box>
        <div className="admin-info">
          <h3>
            <span className="iconfont icon-sign-review-full"></span>
            昵称：
            {adminInfo.name}
          </h3>
          <h3>
            <span className="iconfont icon-sign-review-full"></span>
            头像：
            <Avatar src={adminInfo.avatar} />
          </h3>
          <h3>
            <span className="iconfont icon-nianling"></span>
            码领：
            {adminInfo.codeAge} 年
          </h3>
          <h3>
            <span className="iconfont icon-shenfen"></span>
            身份:
            {adminInfo.identity}
          </h3>
          <h3>
            <span className="iconfont icon-new"></span>
            技术栈：
            {technologyStack.map((item) => {
              return (
                <span className="technology" key={item}>
                  {item}
                </span>
              );
            })}
          </h3>
          <h3>
            <span className="iconfont icon-QQ"></span>
            QQ：
            {adminInfo.qq}
          </h3>
          <h3>
            <span className="iconfont icon-185078emailmailstreamline"></span>
            邮箱：
            {adminInfo.email}
          </h3>
          <h3>
            <span className="iconfont icon-weixin"></span>
            微信：
            {adminInfo.wx}
          </h3>
          <h3>
            <span className="iconfont icon-GitHub"></span>
            Github：
            {adminInfo.github}
          </h3>
          <Button onClick={editAdminInfo}>编辑信息</Button>
          <Modal
            visible={visibleModal}
            title="编辑管理员信息"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {/* 表单 */}
            <Form
              {...layout}
              initialValues={initialValue}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {/* 用户名 */}
              <Form.Item
                label="昵称"
                name="name"
                rules={[{ required: true, message: "请输入你的昵称！" }]}
              >
                <Input />
              </Form.Item>

              {/* 头像 */}
              {/* <Form.Item label="头像">
                <Form.Item
                  name="avatar"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload
                    name="files"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Form.Item> */}
              <Form.Item label="头像" name="avatar">
                <Form.Item
                  // name="dragger"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {/* <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger> */}
                </Form.Item>
              </Form.Item>

              {/* <Form.Item
                label="头像"
                name="avatar"

                // name="name"
                // rules={[{ required: true, message: "请输入你的昵称！" }]}
              >
                <Form.Item>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={uploadhandleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Form.Item> */}

              {/* 码龄 */}
              <Form.Item
                label="码领"
                name="codeAge"
                rules={[{ required: true, message: "请输入你的码领！" }]}
              >
                <Input type="number" />
              </Form.Item>

              {/* 身份 */}
              <Form.Item
                label="身份"
                name="identity"
                rules={[{ required: true, message: "请输入你的身份！" }]}
              >
                <Input />
              </Form.Item>

              {/* 技能 */}
              <Form.Item
                label="技术栈"
                name="technologyStack"
                rules={[{ required: true, message: "请输入你的技术栈！" }]}
              >
                <Input />
              </Form.Item>

              {/* QQ */}
              <Form.Item
                label="QQ"
                name="qq"
                rules={[{ required: true, message: "请输入你的QQ号！" }]}
              >
                <Input />
              </Form.Item>

              {/* email */}
              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: "请输入你的邮箱！" }]}
              >
                <Input />
              </Form.Item>

              {/* wx */}
              <Form.Item
                label="微信"
                name="wx"
                rules={[{ required: true, message: "请输入你的微信号！" }]}
              >
                <Input />
              </Form.Item>

              {/* Github */}
              <Form.Item
                label="Github"
                name="github"
                rules={[{ required: true, message: "请输入你的Github网址！" }]}
              >
                <Input />
              </Form.Item>

              {/* 按钮 */}
              <Form.Item>
                {/* 取消按钮 */}
                <Button key="back" onClick={handleCancel}>
                  取消
                </Button>

                {/* 确认修改按钮 */}
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  // onClick={handleOk}
                  htmlType="submit"
                >
                  确定修改
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Box>
    </div>
  );
}
