/*
 * @Author: your name
 * @Date: 2020-05-19 18:12:16
 * @LastEditTime: 2020-11-25 19:05:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\BlogItem\index.js
 */
import React, { useEffect } from "react";

// 样式
import "./index.less";
//
import { withRouter, Link } from "react-router-dom";
// antd
import { Image } from "antd";

function BlogItem(props) {
  const { title, author, time, _id, descriptionPicture, visits } = props;

  useEffect(() => {
    
    return () => {};
  }, []);
  return (
    <div className="blog">
      <Link to={`/blog/blogList/${_id}`}>
        <div className="blog-item">
          <div className="blog-left">
            <Image
              src={
                descriptionPicture
                  ? descriptionPicture
                  : require("../../assets/images/author.png")
              }
            />
          </div>
          <div className="blog-right">
            <div className="title">{title}</div>
            <div className="author"><span className="iconfont icon-sign-review-full"></span>{author}</div>
            <div className="time"><span className="iconfont icon-riqi"></span>{time}</div>
            <div className="visits"><span className="iconfont icon-redupaixu"></span>{ visits }</div>
          </div>
          {/* <span>内容：</span> */}
          {/* <div className="cont" dangerouslySetInnerHTML={{__html: content}} /> */}
        </div>
      </Link>
    </div>
  );
}

export default withRouter(BlogItem);
