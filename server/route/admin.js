const express = require("express");
const bcrypt = require("bcryptjs");
const admin = express.Router();

const { User } = require("../model/user");

// get
admin.get("/user", (req, res) => {
  console.log(req.session)
  res.send({
    msg: req.session
  })
});

// post请求 /login
admin.post("/login", async (req, res) => {
  // 由于前端使用的 antd 表单，不提交空字符串，因此用户名密码验证直接放在后端
  // 由于查询数据库 user 集合
  let user = await User.findOne();
  let { username, password } = req.body;
  // 验证密码
  let bool = bcrypt.compareSync(password, user.password);

  if (bool && username === user.username) {
    req.session.username = user.username;
    res.status(200);
    res.send({
      status: 200,
      url: "/admin",
      msg: "登录成功",
    });
    return;
  } else {
    console.log("登录失败");

    res.send({
      status: 404,
      url: "/NotFound",
      msg: "终止交易有内鬼",
    });
    return;
  }
});

module.exports = admin;
