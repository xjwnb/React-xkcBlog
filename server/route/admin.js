const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const admin = express.Router();

const { User } = require("../model/user");

const { BlogInfo } = require("../model/admin");

// get
admin.get("/user", (req, res) => {
  console.log(req.session);
  res.send({
    msg: req.session,
  });
});

// post请求 /login
admin.post("/login", async (req, res) => {
  // 由于前端使用的 antd 表单，不提交空字符串，因此用户名密码验证直接放在后端
  // 由于查询数据库 user 集合
  console.log("/login");
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

// 发表
admin.post("/publish", (req, res) => {
  console.log(req.body);
  let { title, author, time, content } = req.body;
  if (
    title.length > 0 &&
    author.length > 0 &&
    time.length > 0 &&
    content.length > 7
  ) {
    console.log("成功");
    BlogInfo.create({
      title,
      author,
      time,
      isShowTop: false,
      content,
    }).then((response) => {
      console.log("插入博客成功");
      res.send({
        status: 200,
        msg: "发表成功",
      });
    });

    return;
  }
  res.send({
    status: 222,
    msg: "发表失败",
  });
});

// 查询所有博客数据
admin.get("/getBlogInfo", async (req, res) => {
  console.log(req.session);
  if (req.session.username) {
    let blogInfo = await BlogInfo.find();
    // console.log(blogInfo)
    res.send({
      status: 200,
      msg: "成功获取所有博客数据",
      data: blogInfo,
    });
    return;
  }
});

module.exports = admin;
