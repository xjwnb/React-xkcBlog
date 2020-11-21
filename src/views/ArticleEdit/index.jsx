import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// 请求方法
import { getBlogInfoById, editorBlogInfo } from "../../requests/admin";
// 组件
import { Box } from "../../components";

// 样式
import "./index.less";
import "braft-editor/dist/index.css";

import BraftEditor from "braft-editor";
// import { ContentUtils } from "braft-utils";

// antd 组件
import { Form, Input, Button, DatePicker, Spin, Alert, Divider, message } from "antd";

import monment from "moment";

function ArticleEdit(props) {
  const [editorState, seteditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  const [defaultValue, setdefaultValue] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [time, setTime] = useState("");
  const [getData, setgetData] = useState("");
  // const [editData, setEditData] = useState({});

  const [form] = Form.useForm();

  // 全局变量
  let editAllData;
  

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    console.log(form);
    console.log(props);
    console.log(props.match.params.id);
    let id = props.match.params.id;
    getBlogInfoById(id).then((res) => {
      console.log(res);
      let { _id, title, author, time, isShowTop ,content } = res.data;
      setgetData({ _id, title, author, time, content });
      setdefaultValue({
        _id,
        title,
        author,
        time,
        isShowTop
      });
      form.setFieldsValue({
        title,
        author,
        time: monment(time),
        content: BraftEditor.createEditorState(content),
      });
    });
  }, [props, form]);

  // 富文本编辑器修改时
  const handleChange = (editor) => {
    seteditorState({
      editorState: editor.toHTML(),
    });
  };

  // 时间选择器选择事件
  const onTimeChange = (value, dateString) => {
    console.log(value, dateString);
    setTime({
      time: dateString,
    });
  };

  // 确定修改按钮事件
  const onFinish = (values) => {
    console.log(values.time._d);
    console.log(defaultValue)
    editAllData = {
      _id: defaultValue._id,
      ...values,
      // time: getData.time,
      time,
      isShowTop: defaultValue.isShowTop,
      content: editorState.editorState,
    };
    // setEditData(editAllData);
    console.log(editAllData);
    editorBlogInfo(editAllData).then(res => {
      console.log(res)
      if (res.status === 200) {
        setisLoading(false)
        message.success(res.msg)
      }
    })
  };

  // 确认提交失败事件
  const onFinishFailed = (err) => {
    console.log(err);
  };

  // 返回文章管理按钮
  const backBtn = () => {
    console.log(props)
    props.history.goBack()
  }

  return (
    <div>
      <Box>
        <span>文章编辑</span>
        <Button className="backBtn"
                onClick={backBtn}
        >
          返回文章管理
        </Button>
        {/* 分割线 */}
        <hr className="hr" />
        <Divider />
        {/* 表单 */}
        {getData ? (
          <Form
            {...layout}
            name="basic"
            initialValues={{
              title: defaultValue.title,
              author: defaultValue.author,
              // time: monment(defaultValue.time),
              time,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            {/* 标题 */}
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: "请输入你的标题!" }]}
            >
              <Input />
            </Form.Item>

            {/* 作者 */}
            <Form.Item
              label="作者"
              name="author"
              rules={[{ required: true, message: "请输入你的名字!" }]}
            >
              <Input />
            </Form.Item>

            {/* 发表时间 */}
            <Form.Item
              label="发表时间"
              name="time"
              rules={[{ required: true, message: "请输入选择时间!" }]}
            >
              <DatePicker
                showTime
                onChange={onTimeChange}
                // onOk={onTimeOk}
              />
            </Form.Item>

            {/* 主要内容  BraftEditor 第三方富文本编辑器*/}
            <Form.Item
              label="主要内容"
              name="content"
              rules={[{ required: true, message: "请输入内容!" }]}
            >
              <BraftEditor value={editorState} onChange={handleChange} />
            </Form.Item>

            {/* 发表按钮 */}
            <Form.Item {...tailLayout}>
              <Button type="primary" loading={isLoading} htmlType="确定修改">
                确定修改
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Spin tip="Loading...">
            <Alert className="LoadingAlert" type="info" />
          </Spin>
        )}
      </Box>
    </div>
  );
}

export default connect()(withRouter(ArticleEdit));
