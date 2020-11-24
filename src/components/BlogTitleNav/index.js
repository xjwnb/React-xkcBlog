import React, { useState } from "react";

// 引入样式
import "./index.less";

export default function BlogTitleNav(props) {
  const [titleList, setTitleList] = useState(props.titleList);
  console.log(titleList);
  console.log(titleList.length);


  // 点击滚动到指定位置
  const scrollHandler = function(offsetTop) {
    let container = document.getElementsByClassName("content")[0];
    // console.log(container.scrollTop);
    container.scrollTop = offsetTop - 70;
    console.log(offsetTop)
  }
  return (
    <ul className="title-list-ul">
      <h3>目录</h3>
      {
        props.titleList.map((item) => {
          return (
            <li key={item.offsetTop}>
              <span onClick={scrollHandler.bind(this, item.offsetTop)}>{item.title}</span>
            </li>
          );
        })
      }
    </ul>
  );
}
