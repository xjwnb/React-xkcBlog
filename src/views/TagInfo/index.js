import React, { useState, useEffect } from "react";

// box
import { Box } from "../../components";

// antd
import { Input, Form, Button, Tag, message } from "antd";

// 颜色选择器 react-color
import { SketchPicker } from "react-color";

// 请求
import { getTagInfo, postTagInfo, deleteTagInfo } from "../../requests/tag";

export default function TagInfo() {
  // 颜色状态
  const [initialTag, setInitialTag] = useState({
    tagName: "",
    tagColor: "#000000",
  });
  const [color, setColor] = useState("#000000");
  const [tagValueArr, setTagValueArr] = useState([]);

  useEffect(() => {
    getTagInfo().then((res) => {
      setTagValueArr(res.data);
    });
  }, []);

  // 修改颜色
  const pickerChangeHandle = function (colorCode) {
    let hex = colorCode.hex || "";
    let hexUpperCase = hex.toLocaleUpperCase();
    setColor(hexUpperCase);
  };

  // Form layout
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 5, span: 19 },
  };

  // Form
  // 提交成功
  const onFinish = (values) => {
    console.log("Success:", values);
    let formValue = {
      tagColor: values.tagColor.hex,
      tagName: values.tagName,
    };
    let tagArr = tagValueArr.map((tag) => {
      return tag.tagName;
    });
    console.log(tagArr);
    if (!tagArr.includes(formValue.tagName)) {
      postTagInfo(formValue).then((res) => {
        if (res.status === 200) {
          setTagValueArr([...tagValueArr, formValue]);
        }
      });
    } else {
      message.warning("请勿提交重复的标签名");
    }
  };

  // 提交失败
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 删除标签
  const tagCloseHandle = (tagValue) => {
    deleteTagInfo(tagValue.tagName).then(res => {
      if (res.status === 200) {
        const tags = tagValueArr.filter(tag => tag.tagName !== tagValue.tagName);
        setTagValueArr(tags);
      }
    })
  };

  return (
    <Box>
      标签：
      {tagValueArr &&
        tagValueArr.map((tagValue) => {
          return (
            <Tag
              closable
              key={tagValue.tagName}
              color={tagValue.tagColor}
              onClose={(e) => {
                e.preventDefault();
                tagCloseHandle(tagValue);
              }}
            >
              {tagValue.tagName}
            </Tag>
          );
        })}
      <Form
        {...layout}
        name="basic"
        initialValues={initialTag}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* 标签名 */}
        <Form.Item
          label="标签名"
          name="tagName"
          rules={[{ required: true, message: "请输入标签名！" }]}
        >
          <Input />
        </Form.Item>

        {/* 标签颜色 */}
        <Form.Item
          label="颜色"
          name="tagColor"
          rules={[{ required: true, message: "请选择标签颜色！" }]}
        >
          <SketchPicker color={color} onChange={pickerChangeHandle} />
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <Input placeholder="Tag" /> */}
      {/* <SketchPicker color={color} onChange={pickerChangeHandle} /> */}
    </Box>
  );
}
