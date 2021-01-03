/*
 * @Author: your name
 * @Date: 2021-01-03 16:45:14
 * @LastEditTime: 2021-01-03 23:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\views\AdminLinksInfo\index.js
 */
import React, { useState, useEffect } from "react";

// 样式
import "./index.less";

// 组件
import { Box } from "../../components";
// antd
import {
  Table,
  Button,
  Avatar,
  Switch,
  Space,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

// 请求
import {
  getLinksInfo,
  editIsPass,
  deleteLinksInfo,
  editorLinksInfo,
} from "@/requests/links";

export default function AdminLinksInfo() {
  // 友链信息
  const [linksInfo, setLinksInfo] = useState([]);
  // 通过的友链信息
  const [passLinksInfo, setPassLinksInfo] = useState([]);
  // 为通过的友链信息
  const [notPassLinksInfo, setNotPassLinksInfo] = useState([]);
  // 是否显示 Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 表单
  const [form] = Form.useForm();
  // 默认的表单数据
  const [initialValuesForm, setInitialValuesForm] = useState({});
  // 删除 Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  // 需要被删除的 linkInfo
  const [deleteLinkInfo, setDeleteLinkInfo] = useState({});

  const notPassColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "网站名称",
      dataIndex: "websiteName",
      key: "websiteName",
    },
    {
      title: "网站Logo",
      dataIndex: "authorImgUrl",
      key: "authorImgUrl",
      render: (text) => (
        <Avatar size="large" src={text} icon={<UserOutlined />} />
      ),
    },
    {
      title: "网站链接",
      dataIndex: "website",
      key: "website",
      render: (text) => <a href={text} target="_blank" >{text}</a>,
    },
    {
      title: "网站描述",
      dataIndex: "describe",
      key: "describe",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "是否通过",
      dataIndex: "isPass",
      key: "isPass",
      render: (text, record) => (
        <Switch
          checkedChildren="已通过"
          unCheckedChildren="未通过"
          checked={record.isPass}
          onChange={(isChecked, event) =>
            changePassSwitchHandle(record, isChecked, event)
          }
        />
      ),
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => editLinksInfoHandle(record)}>编辑</a>
          <a onClick={() => deleteLinksInfoHandle(record)}>删除</a>
        </Space>
      ),
    },
  ];

  // 表单显示布局
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 5, span: 19 },
  };

  // 通过开关
  const changePassSwitchHandle = (data, isChecked, event) => {
    let isPassState = passLinksInfo.includes(data) ? true : false;
    let { _id } = data;
    editIsPass(_id).then((res) => {
      if (isPassState) {
        let nowPassLinksInfo = passLinksInfo.map((link) => {
          if (link._id === _id) {
            link.isPass = isChecked;
          }
          return link;
        });
        setPassLinksInfo(nowPassLinksInfo);
      } else {
        let nowNotPassLinksInfo = notPassLinksInfo.map((link) => {
          if (link._id === _id) {
            link.isPass = isChecked;
          }
          return link;
        });
        setNotPassLinksInfo(nowNotPassLinksInfo);
      }
    });
  };

  // 删除
  const deleteLinksInfoHandle = (data) => {
    setIsDeleteModalVisible(true);
    setDeleteLinkInfo(data);
  };

  // 编辑
  const editLinksInfoHandle = (data) => {
    setInitialValuesForm(data);
    showModal();
  };

  // 显示 modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // modal 确定事件
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        form.setFieldsValue(values);
        values._id = initialValuesForm._id;
        // submitMap(values);
        editorLinksInfo(values).then((res) => {
          if (res.status === 200) {
            message.success("修改成功!");
            setIsModalVisible(false);
          }
        });
      })
      .catch((info) => {
        console.log("校验失败:", info);
      });
  };

  // modal 取消事件
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 表单事件
  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  // 删除 Modal 事件
  const handleDeleteOk = () => {
    setIsDeleteModalVisible(false);
    let data = deleteLinkInfo;
    let isPassState = passLinksInfo.includes(data) ? true : false;
    deleteLinksInfo(data._id).then((res) => {
      if (res.status === 200) {
        message.success("友链信息删除成功！");
        if (isPassState) {
          let nowPassLinksInfo = passLinksInfo.filter(
            (link) => !(link._id === data._id)
          );
          setPassLinksInfo(nowPassLinksInfo);
        } else {
          let nowNotPassLinksInfo = notPassLinksInfo.filter(
            (link) => !(link._id === data._id)
          );
          setNotPassLinksInfo(nowNotPassLinksInfo);
        }
      }
    });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  }

  useEffect(() => {
    getLinksInfo().then((res) => {
      if (res.status === 200) {
        setLinksInfo(res.data);
        let passInfo = [],
          notPassInfo = [];
        // 未通过的友链信息
        // let notPassInfo = res.data.filter(link => !link.isPass);
        res.data.map((link, index) => {
          link.key = index + 1;
          if (link.isPass) {
            passInfo.push(link);
          } else {
            notPassInfo.push(link);
          }
        });
        setNotPassLinksInfo(notPassInfo);
        setPassLinksInfo(passInfo);
      }
    });
  }, [isModalVisible]);

  return (
    <Box>
      <div className="adminLinksInfo-is-pass">
        <span className="pass-span-font">已通过 {passLinksInfo.length} 条</span>
        <Table columns={notPassColumns} dataSource={passLinksInfo} />
      </div>
      <div className="adminLinksInfo-not-pass">
        <span className="not-pass-span-font">
          未通过 {notPassLinksInfo.length} 条
        </span>
        <Table columns={notPassColumns} dataSource={notPassLinksInfo} />
      </div>

      {/* 表单 Modal */}
      <Modal
        title="编辑友链信息"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={initialValuesForm}
          /* onFinish={onFinish}
          onFinishFailed={onFinishFailed} */
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
        </Form>
      </Modal>

      {/* 删除 Modal */}
      <Modal
        title="提示"
        visible={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        确定是否需要删除 id: {deleteLinkInfo.id} 的友链信息！
      </Modal>
    </Box>
  );
}
