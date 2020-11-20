
import React, { useEffect } from "react";

// 样式
import "./index.less";
//
import { withRouter, Link } from "react-router-dom";
// antd
import { Image } from 'antd';

function BlogItem(props) {
  console.log(props);
  const { title, author, time, _id } = props;

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="blog">
      <Link to={`/blog/blogList/${_id}`}>
        <div className="blog-item">
          <div className="blog-left">
            <Image
              width={100}
              src={require("../../assets/images/author.png")}
            />
          </div>
          <div className="blog-right">
            <div className="title">标题：{title}</div>
            <div className="author">作者：{author}</div>
            <div className="time">时间：{time}</div>
          </div>
          {/* <span>内容：</span> */}
          {/* <div className="cont" dangerouslySetInnerHTML={{__html: content}} /> */}
        </div>
      </Link>
    </div>
  );
}

export default withRouter(BlogItem);
