/*
 * @Author: your name
 * @Date: 2020-05-19 21:29:03
 * @LastEditTime: 2020-12-30 22:08:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\Author\index.js
 */
/* eslint-disable */
import React, { useState, useEffect } from 'react'
// 样式
import './index.less'

import { Avatar } from 'antd';

export default function Author(props) {
  const [msg, setMsg] = useState({
    authorImg: require("../../assets/images/author.png"),
  });

  useEffect(() => {
  })
  return (
    <div className="auth">
      <div className="avatar">
        {/* <Image src={msg.authorImg} alt="头像" /> */}
        <Avatar size={100} src={msg.authorImg} />
      </div>
      <div className="msg">
        <h3>昵称：<span>{ props.authorInfo.name }</span></h3>
        <h3>码龄：<span>{ props.authorInfo.codeAge }</span>年</h3>
        <h3>身份：<span>{ props.authorInfo.identity }</span></h3>
        <h3>技术栈：
          <div className="technologyStack">
          {
            props.authorInfo.technologyStack
            ?
            props.authorInfo.technologyStack.map(item => {
              return (
                <div key={item} className="technology">{ item }</div>
              )
            })
            :
            ""
          }
          </div>
          {/* {
            props.authorInfo !== {}
            ?
            props.authorInfo.technologyStack.map(item => {
              return (
                <span>{ item }</span>
              )
            })
            :
            null
          } */}
        </h3>
        <h3>QQ：<span>{ props.authorInfo.qq }</span></h3>

        <h3>邮箱：<span>{ props.authorInfo.email }</span></h3>
        <h3>微信：<span>{ props.authorInfo.wx }</span></h3>

      </div>
    </div>
  )
}
