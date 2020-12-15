import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// 请求方法
import { getBlogInfoById, editorBlogInfo } from "../../requests/admin";
// 组件
import { Box } from "../../components";

// 样式
import "./index.less";

// 富文本
import "braft-editor/dist/index.css";
import "prismjs/themes/prism.css";
import "prismjs/prism";
/* import "prismjs/components/prism-javascript"
import "prismjs/components/prism-java"
import "prismjs/components/prism-php"
import "prismjs/components/prism-css" */
import "braft-extensions/dist/code-highlighter.css";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import BraftEditor from "braft-editor";
const options = {
  includeEditors: ["editor-id-1"], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  excludeEditors: ["editor-id-2"], // 指定该模块对哪些BraftEditor无效
  /*   syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'Java',
      syntax: 'java',
    }, {
      name: 'PHP',
      syntax: 'php'
    }
  ] */
};
import Markdown from "braft-extensions/dist/markdown";
import Table from "braft-extensions/dist/table";
import "braft-extensions/dist/table.css";
// BraftEditor 支持 markdown
BraftEditor.use(Markdown());
BraftEditor.use(
  Table({
    defaultColumns: 3, // 默认列数
    defaultRows: 3, // 默认行数
    withDropdown: false, // 插入表格前是否弹出下拉菜单
    columnResizable: true, // 是否允许拖动调整列宽，默认false
    exportAttrString: 'border="1" style="border-collapse: collapse"', // 指定输出HTML时附加到table标签上的属性字符串
  })
);

BraftEditor.use(CodeHighlighter(options));
// 代码高亮
/* BraftEditor.use(CodeHighlighter({
  includeEditors: ['editor-with-code-highlighter'],
})) */
// import { ContentUtils } from "braft-utils";

// antd 组件
import {
  Form,
  Input,
  Button,
  DatePicker,
  Spin,
  Alert,
  Divider,
  message,
  Upload,
  Modal,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

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
  // 描述图片
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [descriptPicture, setDescriptPicture] = useState("");

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
      let {
        _id,
        title,
        descriptionPicture,
        author,
        time,
        isShowTop,
        content,
      } = res.data;
      setFileList([
        {
          uid: "-1",
          name: "default.png",
          status: "done",
          url: `${descriptionPicture}`,
        },
      ]);
      setgetData({ _id, title, descriptionPicture, author, time, content });
      setdefaultValue({
        _id,
        title,
        descriptPicture: descriptionPicture,
        author,
        time,
        isShowTop,
      });
      form.setFieldsValue({
        title,
        author,
        time: monment(time),
        content: BraftEditor.createEditorState(content),
      });
      console.log(time);
      setTime(time);
    });
  }, [props, form]);

  // 获取图片
  useEffect(() => {
    // 获得 descriptionPricture
    getDesciptPicture();
  });

  // 富文本编辑器修改时
  const braftEditorHandleChange = (editor) => {
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

  // 获得并修改 descriptPicture
  const getDesciptPicture = () => {
    let element = document.getElementsByClassName(
      "ant-upload-list-picture-card-container"
    );
    let lastEle = element[element.length - 1];
    if (lastEle) {
      let href = lastEle
        .getElementsByClassName("ant-upload-list-item-thumbnail")[0]
        .getAttribute("href");
      setDescriptPicture(href);
    }
  };

  // 确定修改按钮事件
  const onFinish = async (values) => {
    // 编辑修改后的数据
    editAllData = {
      _id: defaultValue._id,
      ...values,
      descriptPicture: descriptPicture,
      // time: getData.time,
      time,
      isShowTop: defaultValue.isShowTop,
      content: editorState.editorState,
    };
    // setEditData(editAllData);
    console.log(editAllData);
    console.log(editAllData.descriptPicture);
    editorBlogInfo(editAllData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setisLoading(false);
        message.success(res.msg);
      }
    });
  };

  // 确认提交失败事件
  const onFinishFailed = (err) => {
    console.log(err);
  };

  // 返回文章管理按钮
  const backBtn = () => {
    console.log(props);
    props.history.goBack();
  };

  // 描述图片按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // 点击描述图片的眼睛 icon
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // 关闭描述图片
  const handleCancel = () => {
    return setPreviewVisible(false);
  };

  //
  const handleChange = (data) => {
    let fileList = data.fileList;

    return setFileList(fileList);
  };

  return (
    <div>
      <Box>
        <span>文章编辑</span>
        <Button className="backBtn" onClick={backBtn}>
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

            {/* 描述图片 */}
            <Form.Item
              label="描述图片"
              name="descriptPicture"
              // rules={[{ required: true, message: "请传入图片!" }]}
            >
              <div className="uploadPicture">
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={() => false}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {/* {fileList.length >= 8 ? null : uploadButton} */}
                  {uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
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
              <BraftEditor
                id="editor-with-code-highlighter"
                value={editorState}
                onChange={braftEditorHandleChange}
              />
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
