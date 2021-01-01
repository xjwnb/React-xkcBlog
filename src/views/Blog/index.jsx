/* eslint-disable */
import React, { Component } from "react";
// 自定义组件
import { IndexHOC, BlogList, Author, CarouselAntd } from "../../components";
// 样式
import "./index.less";
// 请求方法
import { getBlogInfo, getBlogBySearch } from "@/requests/blog";
import { getAdminInfo } from "@/requests/admin";

import { Image, Pagination, Spin } from "antd";

import { withRouter } from "react-router-dom";

@IndexHOC
@withRouter
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      blogInfo: [],
      authorInfo: {},
      loading: true,
      /* carouselImages: [
        {
          id: 1,
          src: require("../../assets/images/carousel/carousel1.jpg"),
        },
        {
          id: 2,
          src: require("../../assets/images/carousel/carousel2.jpg"),
        },
        {
          id: 3,
          src: require("../../assets/images/carousel/carousel3.jpg"),
        },
        {
          id: 4,
          src: require("../../assets/images/carousel/carousel4.jpg"),
        },
        {
          id: 5,
          src: require("../../assets/images/carousel/carousel5.jpg"),
        },
        {
          id: 6,
          src: require("../../assets/images/carousel/carousel6.jpg"),
        },
      ], */
    };
  }

  componentDidMount() {
    // 获取博客数据
    getBlogInfo().then((res) => {
      if (res.status === 200) {
        // 获得置顶博客的新数组
        let screenBlogData = this.screenSetBlogData(res.data);
        this.setState({
          blogInfo: screenBlogData,
          loading: false,
        });
      }
    });

    // 获取管理员信息
    /* getAdminInfo().then((res) => {
      if (res.status === 200) {
        this.setState({
          authorInfo: res.data,
        });
      }
    }); */

    // console.log(this.props);
    // let search = this.props.location.search;
    // console.log(search);
    this.props.history.listen(() => {
      let searchStr = this.props.history.location.search;
      // console.log(this.props.history.location.search);
      if (searchStr) {
        let { title } = this.queryFormat(searchStr);
        // console.log(title);
        let _this = this;
        getBlogBySearch(title).then((res) => {
          if (res.status === 200) {
            _this.setState({
              blogInfo: res.data,
            });
          }
        });
      }
    });
  }

  queryFormat(str) {
    let formatStr = str.slice(1);
    let querySplit = formatStr.split("&");
    let result = {};
    querySplit.forEach((item) => {
      // console.log(item);
      let splitStr = item.split("=");
      result[splitStr[0]] = splitStr[1];
    });
    return result;
  }

  // 筛选出置顶博客，并放置在数组前面
  screenSetBlogData(blogData) {
    let topBlogData = [],
      anthorBlogData = [];
    blogData.map((blog) => {
      if (blog.isShowTop) {
        topBlogData.push(blog);
      } else {
        anthorBlogData.push(blog);
      }
    });
    return [...topBlogData, ...anthorBlogData];
  }

  render() {
    const state = this.state;
    return (
      <Spin spinning={state.loading}>
        <div className="BlogContent">
          <div className="left-blog">
            {/* <CarouselAntd carouselImages={state.carouselImages} /> */}
            {/*           {
            state.blogInfo.length > 0
            ?
            <BlogList blogInfo={state.blogInfo}/>
            :
            null
          } */}

            <BlogList blogInfo={state.blogInfo} />

            <Pagination
              defaultCurrent={1}
              total={state.blogInfo.length}
              hideOnSinglePage
            />
          </div>

          {/* <div className="right-blog">
          <Author className="author" authorInfo={state.authorInfo} />
        </div> */}
        </div>
      </Spin>
    );
  }
}

export default Blog;
