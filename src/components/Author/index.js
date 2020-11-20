/*
 * @Author: your name
 * @Date: 2020-05-19 21:29:03
 * @LastEditTime: 2020-11-20 14:17:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\Author\index.js
 */

import React, { useState } from 'react'
// 样式
import './index.less'

export default function Author() {
  const [msg, setMsg] = useState({
    authorImg: require("../../assets/images/author.png"),
    name: "小卡车",
    codeAge: 0,
    identity: "大三"
  })
  return (
    <div className="auth">
      <div className="avatar">
        <img src={msg.authorImg} alt="头像"></img>
      </div>
      <div className="msg">
        <h3>昵称：{ msg.name }</h3>
        <h3>码龄：{ msg.codeAge }年</h3>
        <h3>身份：{ msg.identity }</h3>
      </div>
    </div>
  )
}
