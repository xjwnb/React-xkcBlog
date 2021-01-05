/*
 * @Author: your name
 * @Date: 2020-05-19 18:12:16
 * @LastEditTime: 2021-01-05 20:51:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\BlogItem\index.js
 */
import React, { useEffect, useState } from "react";

// 样式
import "./index.less";
//
import { withRouter, Link } from "react-router-dom";
// antd
import { Image, Tag, Divider } from "antd";

function BlogItem(props) {
  const [formatContent, setFormatContent] = useState("");
  const {
    title,
    author,
    time,
    _id,
    descriptionPicture,
    description,
    visits,
    tags,
    content,
  } = props;
  useEffect(() => {
    let regexp = /<\/?.+?\/?>/g;
    let newContent = content.replace(regexp, "");
    setFormatContent(newContent);
    return () => {};
  }, []);
  return (
    <div className="blog">
      <Link to={`/blog/blogList/${_id}`}>
        <div className="blog-item">
          {/* <div className="blog-left">
            <Image
              src={
                descriptionPicture
                  ? descriptionPicture
                  : require("../../assets/images/author.png")
              }
            />
          </div> */}
          {/* <div className="blog-right">
            <div className="title">{title}</div>
            <div className="author"><span className="iconfont icon-sign-review-full"></span>{author}</div>
            <div className="time"><span className="iconfont icon-riqi"></span>{time}</div>
            <div className="visits"><span className="iconfont icon-redupaixu"></span>{ visits }</div>
            <div className="visits">
              <span className="iconfont icon-tag-fill"></span>
              {
                tags.map(tag => {
                  return (
                    <Tag key={tag.tagName} color={tag.tagColor}>{tag.tagName}</Tag>
                  )
                })
              }
            </div>
          </div> */}
          <div className="blog-main-content">
            <div className="title">{title}</div>
            <span className="iconfont icon-sign-review-full"></span>
            {author}
            <Divider type="vertical" className="blog-divider-style" />
            <span className="iconfont icon-riqi"></span>
            {time}
            <Divider type="vertical" className="blog-divider-style" />
            <span className="iconfont icon-redupaixu"></span>
            {visits}
            <Divider type="vertical" className="blog-divider-style" />
            <span className="iconfont icon-tag-fill"></span>
            {tags.map((tag) => {
              return (
                <Tag key={tag.tagName} color={tag.tagColor}>
                  {tag.tagName}
                </Tag>
              );
            })}
          </div>
          <div className="blog-flex-div">
            <div className="blog-img">
              <Image
                src={
                  descriptionPicture
                    ? descriptionPicture
                    : require("../../assets/images/author.png")
                }
              />
            </div>
            <div className="blog-content-show">{description}</div>
          </div>
          {/* <span>内容：</span> */}
          {/* <div className="cont" dangerouslySetInnerHTML={{__html: content}} /> */}
        </div>
      </Link>
    </div>
  );
}

export default withRouter(BlogItem);
