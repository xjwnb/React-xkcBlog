
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
        <h2>个人信息：</h2>
        <h3>昵称：{ msg.name }</h3>
        <h3>码龄：{ msg.codeAge }年</h3>
        <h3>身份：{ msg.identity }</h3>
      </div>
    </div>
  )
}
