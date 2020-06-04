import React, { useEffect } from "react";

// 样式
import "./index.less";
//
import { withRouter, Link } from "react-router-dom";

function BlogItem(props) {
  console.log(props);
  const { title, author, time, _id } = props;

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <ul>
      <Link to={`/blog/blogList/${_id}`}>
        <div className="blog-item">
          <li>
            <div className="title">标题：{title}</div>
          </li>
          <li>
            <div className="author">作者：{author}</div>
          </li>
          <li>
            <div className="time">时间：{time}</div>
          </li>

          {/* <span>内容：</span> */}
          {/* <div className="cont" dangerouslySetInnerHTML={{__html: content}} /> */}
        </div>
      </Link>
    </ul>
  );
}

export default withRouter(BlogItem);
