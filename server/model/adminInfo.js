const mongoose = require("mongoose");
const adminInfo = new mongoose.Schema({
  id: {
    type: String,
    default: "1"
  },
  // 姓名
  name: {
    type: String,
  },
  avatar: {
    type: String
  },
  // 码龄
  codeAge: {
    type: Number,
  },
  // 身份
  identity: {
    type: String,
  },
  // 技术栈
  technologyStack: {
    type: Array,
  },
  qq: {
    type: String,
  },
  email: {
    type: String
  },
  wx: {
    type: String
  },
  github: {
    type: String
  }
});



const AdminInfo = mongoose.model("AdminInfo", adminInfo);


/* AdminInfo.create({
  name: "小卡车",
  avatar: "",
  codeAge: 0,
  identity: "大三",
  technologyStack: ["JavaScript", "ES6","Vue", "React", "Node.js"],
  qq: "1565163445",
  email: "1565163445@qq.com",
  wx: "13580404547",
  github: "https://github.com/xjwnb"
}).then(res => {
  console.log("adminInfo 插入成功");
}).catch(err => {
  console.log("adminInfo 插入失败");
}) */

module.exports = {
  AdminInfo,
};
