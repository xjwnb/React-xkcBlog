import React, { useEffect, useState } from "react";

import { Box } from "@/components";

import { getAdminInfo, postAdminInfo } from "@/requests/admin";

// 引入样式
import "./index.less";

import { Button, Modal, Form, Input } from "antd";

export default function AdminInfo() {
  const [adminInfo, setAdminInfo] = useState({});
  const [technologyStack, setTechnologyStack] = useState([]);
  const [visibleModal, setVisibleModel] = useState(false);
  const [loading, setLoading] = useState(false);
  // 表单默认信息
  const [initialValue, setInitialValue] = useState({});

  useEffect(() => {
    getAdminInfo().then((res) => {
      if (res.status === 200) {
        setAdminInfo(res.data);
        setTechnologyStack(res.data.technologyStack);
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
    let copyForm = Object.assign({}, formValues);
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

  return (
    <div>
      <Box>
        <div className="admin-info">
          <h3>
            <span className="iconfont icon-sign-review-full"></span>
            {adminInfo.name}
          </h3>
          <h3>
            <span className="iconfont icon-nianling"></span>
            {adminInfo.codeAge} 年
          </h3>
          <h3>
            <span className="iconfont icon-shenfen"></span>
            {adminInfo.identity}
          </h3>
          <h3>
            <span className="iconfont icon-new"></span>
            {technologyStack.map((item) => {
              return (
                <span className="technology" key={item}>
                  {item}
                </span>
              );
            })}
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
