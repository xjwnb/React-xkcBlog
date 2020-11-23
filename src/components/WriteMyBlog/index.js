import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import "braft-editor/dist/index.css";

// antd 组件
import { Form, Input, Button, DatePicker, message, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      descriptPicture: "",
    };
  }
  // 发表事件
  onFinish = async (values) => {
    this.setState({
      isLoading: true,
    });
    values.time = this.state.time;
    values.content = this.state.editorState;
    values.descriptPicture = this.state.descriptPicture;
    values.visits = 0;
    console.log("onFinish", values);
    

    publish(values).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({
          isLoading: false,
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
              clearInterval(timer);
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
    message.error("请按要求输入信息");
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
  braftEditorHandleChange = (editorState) => {
    this.setState({
      editorState: editorState.toHTML(),
    });
  };

  uploadHandler = (param) => {
    console.log(param)
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
    },() => {
      console.log(this.state.editorState)
    });
  };

  // 描述图片
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    /* if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    } */

    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = (data) => {
    return this.setState({ fileList: data.fileList });
  };

  componentDidUpdate() {
    if (!this.state.descriptPicture) {
      let element = document.querySelector(".ant-upload-list-item-info span");
      if (element !== null) {
        let a = element.childNodes[0];
        if (a.nodeName === "A") {
          let imageUrl = a.getAttribute("href");
          if (imageUrl) {
            this.setState({
              descriptPicture: imageUrl,
            });
          }
        }
      }
    }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
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

          {/* 描述图片 */}
          <Form.Item 
            label="描述图片" 
            name="descriptPicture"
            rules={[{ required: true, message: "请传入图片!" }]}>
            <div className="uploadPicture">
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {/* {fileList.length >= 8 ? null : uploadButton} */}
                {uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
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
              onChange={this.braftEditorHandleChange}
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
