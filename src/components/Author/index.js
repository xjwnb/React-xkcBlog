import React from 'react'
// 样式
import './index.less'

export default function Author() {
  return (
    <div className="auth">
      <div className="avatar">
        <img src={require('../../assets/images/author.jpg')} alt="头像"></img>
      </div>
      <div className="msg">
        <h2>个人信息：</h2>
        <h3>昵称：小卡车</h3>
        <h3>码龄：0年</h3>
        <h3>身份：大二</h3>
      </div>
    </div>
  )
}
