const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const admin = express.Router();

const { User } = require("../model/user");

const { BlogInfo } = require("../model/admin");

// get
admin.get("/user", (req, res) => {
  console.log(req.session);
  if (req.session.username !== null) {
    res.send({
      msg: req.session,
    });
  }
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
    console.log("login 成功");
    req.session.username = user.username;
    console.log(req.session);
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
  let { title, author, time, content, descriptPicture, visits } = req.body;
  if (
    title.length > 0 &&
    author.length > 0 &&
    time.length > 0 
  ) {
    console.log("成功");
    BlogInfo.create({
      title,
      author,
      descriptionPicture: descriptPicture,
      time,
      isShowTop: false,
      visits,
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
    let newBlogInfo = blogInfo.reverse();
    // console.log(blogInfo)
    res.send({
      status: 200,
      msg: "成功获取所有博客数据",
      data: newBlogInfo,
    });
    return;
  }
  res.send({
    status: 404,
    msg: "请先登录",
  });
  console.log({
    status: 404,
    msg: "请先登录",
  });
  return;
});

// 修改置顶
admin.post("/editToShowTop", async (req, res) => {
  let id = req.body.id;
  // 获取更新前对应 ID 的数据
  let blogInfo = await BlogInfo.findOne({ _id: id });
  console.log(id, blogInfo);
  // 更新数据
  await BlogInfo.findOneAndUpdate(
    { _id: id },
    {
      isShowTop: !blogInfo.isShowTop,
    }
  );
  // 获取更新后的对应 ID 的数据
  let data = await BlogInfo.findOne({ _id: id });
  console.log(data);
  res.send({
    status: 200,
    data,
    msg: "更新成功",
  });
});

// 根据 id 获得对应博客数据用于编辑博客
admin.get("/getBlogInfoById", async (req, res) => {
  console.log("根据id 获得数据", req.query.id);
  let id = req.query.id;
  let data = await BlogInfo.findOne({ _id: id });
  // console.log(data);
  // 如果可以获取到数据
  if (data._id) {
    res.send({
      status: 200,
      data,
      msg: "成功获取数据",
    });
    return;
  } else {
    res.send({
      status: 404,
      msg: "提交数据错误",
    });
  }
});

// 编辑博客
admin.post("/editorBlogInfo", async (req, res) => {
  let id = req.body._id;
  let { _id, title, descriptPicture, author, content } = req.body;
  
  let time = req.body.time.time;
  // console.log(descriptPicture.slice(0, 8));
  // console.log(time)
  await BlogInfo.findByIdAndUpdate(
    { _id },
    {
      title,
      descriptionPicture: descriptPicture,
      author,
      time,
      content,
    }
  );
  res.send({
    status: 200,
    msg: "编辑成功",
  });
});

// 删除博客
admin.post("/deleteBlogInfo", async (req, res) => {
  console.log(req.body.id);
  let id = req.body.id;
  await BlogInfo.deleteOne({ _id: id });
  let nowBlogInfo = await BlogInfo.findOne({ _id: id });
  console.log(nowBlogInfo);
  if (!nowBlogInfo) {
    res.send({
      status: 200,
      msg: "删除成功",
    });
    return;
  }
  res.send({
    status: 404,
    msg: "删除失败",
  });
});

admin.get("/loginOut", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return;
    } else {
      res.send({
        status: 200,
        msg: "注销成功",
      });
    }
  });
});

module.exports = admin;
