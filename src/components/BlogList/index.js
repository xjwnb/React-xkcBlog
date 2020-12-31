/*
 * @Author: your name
 * @Date: 2020-05-19 18:11:33
 * @LastEditTime: 2021-01-01 00:32:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\BlogList\index.js
 */
import React, { useState, useEffect } from "react";
// 样式
import "./index.less";
// 组件
import { BlogItem } from "../index";

import { withRouter } from "react-router-dom";

// import { SearchInput } from "@/components";

function BlogList(props) {
  const [blog, setblog] = useState([]);

  useEffect(() => {
    setblog(props.blogInfo);

    /* const asyn = async (props) => {
      await setblog(Object.values(props));
    };
    asyn(props); */
  }, [props.blogInfo]);

  // 搜索
/*   const searchInput = function (value) {
    props.history.push(`?title=${value}`);
  }; */

  return (
    <div className="blog-list">
      <h3>博客日志 <span className="fontNum">{blog.length}</span> 篇</h3>
      {/* <SearchInput searchInput={searchInput} /> */}
      {blog.map((item, index) => (
        <BlogItem key={index} {...item} />
      ))}
    </div>
  );
}
export default withRouter(BlogList);
