/*
 * @Author: your name
 * @Date: 2020-05-14 22:21:02
 * @LastEditTime: 2021-01-05 17:37:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\server\model\admin.js
 */
const mongoose = require("mongoose");

const blogInfo = new mongoose.Schema({
  id: {
    type: Number,
  },
  // 标题
  title: {
    type: String,
  },
  // 作者
  author: {
    type: String,
  },
  // 描述图片
  descriptionPicture: {
    type: String,
  },
  description: {
    type: String,
  },
  // 时间
  time: {
    type: String,
  },
  // 是否置顶
  isShowTop: {
    type: Boolean,
  },
  // 访问量
  visits: {
    type: Number,
  },
  // 标签
  tags: {
    type: Array, // [{ tagName: "javascript", tagColor: "#a058db" }]
  },
  // 内容
  content: {
    type: String,
  },
});

let BlogInfo = mongoose.model("BlogInfo", blogInfo);

// 初始化首条博客数据
/* BlogInfo.create({
  title: '小卡车的第一篇博客',
  author: '小卡车',
  descriptionPicture: "",
  time: '2020-05-15 13:36:20',
  isShowTop: false,
  visits: 0,
  tags:  [{ tagName: "javascript", tagColor: "#a058db" }],
  content: '<p>这是博客内容</p>'
}).then(res => {
  console.log('发表成功插入成功')
}).catch(err => {
  console.log('发表插入失败')
}) */

module.exports = {
  BlogInfo,
};
