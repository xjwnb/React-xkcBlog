/* eslint-disable */
import React, { Component } from "react";
// 自定义组件
import { IndexHOC, BlogList, Author, CarouselAntd } from "../../components";
// 样式
import "./index.less";
// 请求方法
import {
  getBlogInfo,
  getBlogBySearch,
  getBlogInfoByTag,
} from "@/requests/blog";
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
      allBlogInfo: [],
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
          allBlogInfo: screenBlogData,
          loading: false,
        });
      }
    });
  }

  componentDidUpdate(nextProps) {
    // 根据location变化请求数据
    if (nextProps.location !== this.props.location) {
      let searchStr = this.props.history.location.search;
      if (searchStr) {
        let formatSearch = this.queryFormat(searchStr);
        if (formatSearch.tagName) {
          getBlogInfoByTag(formatSearch.tagName).then((res) => {
            this.setState({
              blogInfo: res.data,
            });
          });
        }
        // let { title } = this.queryFormat(searchStr);
        // // console.log(title);
        // let _this = this;
        // getBlogBySearch(title).then((res) => {
        //   if (res.status === 200) {
        //     _this.setState({
        //       blogInfo: res.data,
        //     });
        //   }
        // });
      } else {
        this.setState({
          blogInfo: this.state.allBlogInfo,
        });
      }
    }
  }

  // 格式化 query 数据
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
        </div>
      </Spin>
    );
  }
}

export default Blog;
