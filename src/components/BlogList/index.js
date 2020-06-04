import React, { useState, useEffect } from "react";
// 样式
import './index.less'
// 组件
import { BlogItem } from "../index";

export default function BlogList(props) {
  const [blog, setblog] = useState([]);

  useEffect(() => {
    const asyn = async (props) => {
      await setblog(Object.values(props));
    };
    asyn(props);
  }, [props]);

  return (
    <div className="blog-list">
      {
        blog.map((item, index) => (
          <BlogItem key={index} {...item} />
        ))
      }
    </div>
  );
}
