import React, { useState } from "react";

import { Form, Input, Button, DatePicker } from "antd";


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function WriteMyBlog() {

  const [time, setTime] = useState('')

  const onFinish = values => {
    values.time = time.time
    console.log(values)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setTime({
      time: dateString
    })
    console.log(time)
  }

  const onOk = (value) => {
    console.log('onOk: ', value);
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入你的标题!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="作者"
        name="author"
        rules={[{ required: true, message: "请输入你的名字!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="发表时间"
        name="time"
        rules={[{ required: true, message: "请输入选择时间!" }]}
      >
        <DatePicker showTime onChange={onChange} onOk={onOk} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          发表
        </Button>
      </Form.Item>
    </Form>
  );
}
