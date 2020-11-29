/*
 * @Author: your name
 * @Date: 2020-05-19 18:11:33
 * @LastEditTime: 2020-11-29 14:44:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\BlogList\index.js
 */
import React, { useState, useEffect } from "react";
// 样式
import "./index.less";
// 组件
import { BlogItem } from "../index";

import { Link } from 'react-router-dom';

// import { SearchInput } from '@/components';

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
      {/* <SearchInput /> */}
      {/* <Link to={{
        path: "/blog",
        search: "?title=JSON"
      }}>Search</Link> */}
      {blog.map((item, index) => (
        <BlogItem key={index} {...item} />
      ))}
    </div>
  );
}
