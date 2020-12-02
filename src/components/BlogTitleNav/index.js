import React, { useState } from "react";

// 引入样式
import "./index.less";

export default function BlogTitleNav(props) {
  const [titleList, setTitleList] = useState(props.titleList);
  const [scrollNumber] = useState(20);
  const [scrollTime] = useState(10);


  // 点击滚动到指定位置
  const scrollHandler = function(offsetTop, e) {
    let container = document.getElementsByClassName("content")[0];
    container.scrollTop = offsetTop;
    let ul = document.querySelector(".title-list-ul");
    let a = ul.getElementsByTagName("a");
    for(let i = 0; i < a.length; i++) {
      a[i].setAttribute("style", "color: #3cd4ae");
    }
    e.target.setAttribute("style", "color: rgb(65, 136, 202)");
/*     let timer = null;
    clearInterval(timer);
    if (container.scrollTop > offsetTop ) {
      timer = setInterval(() => {
        container.scrollTop = container.scrollTop - scrollNumber;
        if (container.scrollTop < offsetTop) {
          clearInterval(timer);
        }
      }, scrollTime);
    } else {
      timer = setInterval(() => {
        container.scrollTop = container.scrollTop + scrollNumber;
        if (container.scrollTop > offsetTop - 30) {
          clearInterval(timer);
        }
      }, scrollTime);
    } */
  }
  return (
    <ul className="title-list-ul">
      <h3>目录</h3>
      {
        props.titleList.map((item) => {
          return (
            <li key={item.offsetTop}>
              <a onClick={scrollHandler.bind(this, item.offsetTop)}>{item.title}</a>
            </li>
          );
        })
      }
    </ul>
  );
}
