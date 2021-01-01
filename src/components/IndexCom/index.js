import React, { useEffect, useState } from "react";

// 样式
import "./index.less";

import { Link } from "react-router-dom";

// antd
import { Layout, BackTop } from "antd";
const { Header, Footer, Content } = Layout;

import { Author, TagCloud } from "@/components";
import { getAdminInfo } from "@/requests/admin";
import { getTagInfo } from "@/requests/tag";

export default function IndexCom(props) {
  // 管理员信息
  const [authorInfo, setauthorInfo] = useState([]);
  // 标签信息
  const [tagInfo, setTagInfo] = useState([]);

  useEffect(() => {
    // 获取管理员信息
    getAdminInfo().then((res) => {
      if (res.status === 200) {
        setauthorInfo(res.data);
      }
    });

    // 获取标签信息
    getTagInfo().then((res) => {
      if (res.status === 200) {
        setTagInfo(res.data);
      }
    });

    let content = document.getElementsByClassName("content")[0];
    let header = document.getElementsByTagName("header")[0];
    content.addEventListener("scroll", function () {
      if (content.scrollTop === 0) {
        // console.log("动画开始");
        header.setAttribute("style", "top: 0px");
      } else {
        // console.log(header);
        header.setAttribute("style", "top: -64px");
        if (content.scrollTop > 20) {
        }
      }
    });
    return () => {};
  }, []);

  // 置顶样式
  const backTopStyle = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };

  return (
    <div>
      <div className="index">
        <Layout className="layout">
          <Header className="header">
            <div className="logo">
              <Link to="/">
                <span>小卡车的博客</span>
              </Link>
            </div>
            <div className="nav">
              <ul>
                <Link to="/blog" rel="noopener noreferrer">
                  <li>博客</li>
                </Link>
                <Link to="/login" rel="noopener noreferrer">
                  <li>管理员登录</li>
                </Link>
                {/*                 <a
                  href="https://github.com/xjwnb/xkcBlog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>
                    <div className="github">
                      <svg
                        className="octicon octicon-mark-github v-align-middle"
                        height="32"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="32"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        ></path>
                      </svg>
                      小程序版博客
                    </div>
                  </li>
                </a> */}
              </ul>
            </div>
          </Header>
          <Content className="content">
            <div className="blog-content-indexCom">
              <div className="children-blog-content">{props.children}</div>
              <div className="right-blog">
                <Author className="author" authorInfo={authorInfo} />
                <TagCloud tagInfo={tagInfo} />
              </div>
            </div>
            {/* 置顶 */}
            <BackTop
              visibilityHeight="100"
              target={() => document.getElementsByClassName("content")[0]}
            >
              <div style={backTopStyle}>UP</div>
            </BackTop>
            <Footer className="footer"></Footer>
          </Content>
        </Layout>
      </div>
    </div>
  );
}
