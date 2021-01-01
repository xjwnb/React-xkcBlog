import React, { Component } from "react";

// 高阶组件
import { IndexHOC, BlogTitleNav } from "../../components";
// react-router-dom
import { withRouter } from "react-router-dom";
// 请求
import { getBlogInfoById } from "../../requests/blog";
// 样式
import "./index.less";
import "braft-extensions/dist/table.css";


import Prism from "prismjs"

import { Image, Tag } from 'antd';

@IndexHOC
@withRouter
class BlogList extends Component {
  constructor() {
    super();
    this.state = {
      blogContent: "",
      __html: "",
      titleList: [],
    };
  }

  async componentDidMount() {
    
    // console.log(this.props);
    let props = this.props;
    let id = props.match.params.id;
    const { blogInfo } = await this.getBlogDataById(id);
    // console.log(blogInfo);
    this.setState(
      {
        blogContent: blogInfo,
        __html: blogInfo.content,
      },
      () => {
        if (this.state.__html !== "") {
          let h2Array = document.getElementsByTagName("h2");
          if (h2Array) {
            /*             console.log(h2Array);
            console.log(h2Array.length); */
            let titleList = [];
            // 标题数组
            for (let i = 0, l = h2Array.length; i < l; i++) {
              /*               console.log(h2Array[i].innerHTML);
              console.log(h2Array[i].offsetTop); */
              titleList.push({
                title: h2Array[i].innerHTML,
                offsetTop: h2Array[i].offsetTop,
              });
            }
            // console.log(titleList);
            this.setState({
              titleList,
            });
          }
        }
      }
    );
    /* getBlogInfoById(id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        let blogContent = res.data.blogInfo;
        this.setState({
          blogContent,
          __html: blogContent.content,
        });
        return;
      } else {
        props.history.push("/NotFound");
      }
    }); */

  }

  getBlogDataById = (id) => {
    return new Promise((resolve, reject) => {
      getBlogInfoById(id).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          resolve(res.data);
        } else {
          reject(new Error("获取数据失败"));
        }
      });
    });
  };

  render() {
    let state = this.state;

    return (
      <div className="blog-content">
        <div className="conten">
          <h1 className="title">{state.blogContent.title}</h1>
          {/* <h3 className="author">{state.blogContent.author}</h3> */}
          <h3 className="blogtime">
            <i className="iconfont icon-riqi"></i>
            {state.blogContent.time}
          </h3>
          <h3 className="blogtime">
            <i className="iconfont icon-tag-fill"></i>
            {
              state.blogContent.tags && state.blogContent.tags.map(tag => {
                return (
                  <Tag key={tag.tagName} color={tag.tagColor}>{tag.tagName}</Tag>
                )
              })
            }
          </h3>
          
          {/* <img className="description-img" src={state.blogContent.descriptionPicture} /> */}
          {/* <h1 className="blogcontent">{ state.blogContent.content }</h1> */}
          <div className="blogContent">
            <div dangerouslySetInnerHTML={{ __html: state.__html }} />
          </div>
        </div>
        {/* {state.titleList.length > 0 ? (
          <div className="blog-titleList">
            <BlogTitleNav titleList={state.titleList} />
          </div>
        ) : null} */}
      </div>
    );
  }
}

export default BlogList;
