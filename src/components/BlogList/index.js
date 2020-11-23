import React, { useState, useEffect } from "react";
// 样式
import "./index.less";
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

  useEffect(() => {
    /* let container = document.querySelector(".content");
    let blogEle = document.querySelectorAll(".blog");
    console.log(blogEle, blogEle.length);
    for (let i = 0, l = blogEle.length; i < l; i++) {
      console.log(blogEle[i].offsetTop);
    }
    container.addEventListener("scroll", function() {
      console.log(this.clientHeight);
      console.log(this.scrollTop);
    }) */
  });

  return (
    <div className="blog-list">
      {blog.map((item, index) => (
        <BlogItem key={index} {...item} />
      ))}
    </div>
  );
}
