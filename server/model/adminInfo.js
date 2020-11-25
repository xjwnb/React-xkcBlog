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
  // 年龄
  codeAge: {
    type: Number,
  },
  identity: {
    type: String,
  },
  technologyStack: {
    type: Array,
  },
});



const AdminInfo = mongoose.model("AdminInfo", adminInfo);


/* AdminInfo.create({
  name: "小卡车",
  codeAge: 0,
  identity: "大三",
  technologyStack: ["JavaScript", "ES6","Vue", "React", "Node.js"]
}).then(res => {
  console.log("adminInfo 插入成功");
}).catch(err => {
  console.log("adminInfo 插入失败");
}) */

module.exports = {
  AdminInfo,
};
