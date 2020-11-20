import React, { Component } from "react";
// 自定义组件
import { IndexHOC, BlogList, Author, CarouselAntd } from "../../components";
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
      carouselImages: [
        {
          id: 1,
          src: require("../../assets/images/carousel/carousel1.jpg")
        },
        {
          id: 2,
          src: require("../../assets/images/carousel/carousel2.jpg")
        },
        {
          id: 3,
          src: require("../../assets/images/carousel/carousel3.jpg")
        },
        {
          id: 4,
          src: require("../../assets/images/carousel/carousel4.jpg")
        },
        {
          id: 5,
          src: require("../../assets/images/carousel/carousel5.jpg")
        },
        {
          id: 6,
          src: require("../../assets/images/carousel/carousel6.jpg")
        },
      ]
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
    const state = this.state;
    return (
      <div className="BlogContent">
        <div className="right-blog">
          <CarouselAntd carouselImages={state.carouselImages} />
          <BlogList {...state.blogInfo} />
        </div>

        <div className="left-blog">
          <Author className="author" />
        </div>
      </div>
    );
  }
}

export default Blog;
