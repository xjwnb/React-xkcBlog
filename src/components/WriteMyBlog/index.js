import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import "braft-editor/dist/index.css";

// antd 组件
import { Form, Input, Button, DatePicker, message } from "antd";

// axios 方法
import { publish } from "../../requests/admin";

// 组件

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class WriteMyBlog extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      time: "",
      isLoading: false,
      second: 3,
    };
  }
  // 发表事件
  onFinish = async (values) => {
    this.setState({
      isLoading: true,
    });
    values.time = this.state.time;
    values.content = this.state.editorState;

    publish(values).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({
          isLoading: false
        });
        values = null;
        message.success("发表成功！");
      } else {
        if (res.url) {
          message.error("发表失败！请重新登录");
          let timer = setInterval(() => {
            message.warning(this.state.second + "秒后转入登录页面");
            this.setState({
              second: --this.state.second,
            });

            if (this.state.second === -1) {
              setTimeout(() => {
                this.props.history.push(res.url);
              }, 2000);
              clearInterval(timer)
              return;
            }
          }, 3000);
          return;
        }
        message.error("发表失败！");
      }
    });
    console.log(values);
  };
  // 发表失败事件
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 时间选择器选择事件
  onTimeChange = (value, dateString) => {
    this.setState({
      time: dateString,
    });
  };

  onTimeOk = (value) => {
    console.log("onOk: ", value);
  };

  // BraftEditor 富文本编辑器修改触发
  handleChange = (editorState) => {
    this.setState({
      editorState: editorState.toHTML(),
    });
  };

  uploadHandler = (param) => {
    if (!param.file) {
      return false;
    }

    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [
        {
          type: "IMAGE",
          url: URL.createObjectURL,
        },
      ]),
    });
  };

  render() {
    return (
      <Fragment>
        {/* 表单 */}
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
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
              onChange={this.onTimeChange}
              onOk={this.onTimeOk}
            />
          </Form.Item>

          {/* 主要内容  BraftEditor 第三方富文本编辑器*/}
          <Form.Item
            label="主要内容"
            name="content"
            rules={[{ required: true, message: "请输入内容!" }]}
          >
            <BraftEditor
              value={this.state.editorState}
              onChange={this.handleChange}
            />
          </Form.Item>

          {/* 发表按钮 */}
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              loading={this.state.isLoading}
              htmlType="submit"
            >
              发表
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(WriteMyBlog);
