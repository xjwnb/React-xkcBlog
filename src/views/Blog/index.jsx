import React, { Component } from "react";
// 自定义组件
import { IndexHOC, BlogList, Author } from "../../components";
// 样式
import "./index.less";
// 请求方法
import { getBlogInfo } from "../../requests/blog";

@IndexHOC
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      blogInfo: [],
    };
  }

  componentDidMount() {
    // 获取博客数据
    getBlogInfo().then((res) => {
      if (res.status === 200) {
        this.setState({
          blogInfo: res.data,
        });
        console.log(this.state.blogInfo);
      }
    });
  }

  render() {
    const props = this.state;
    return (
      <div className="BlogContent">
        <BlogList {...props.blogInfo} />

        <Author />
      </div>
    );
  }
}

export default Blog;
