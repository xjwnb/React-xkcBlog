/*
 * @Author: your name
 * @Date: 2020-05-19 17:49:30
 * @LastEditTime: 2021-01-01 17:50:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\server\route\blog.js
 */

const express = require("express");
const mongoose = require("mongoose");
const blog = express.Router();

const { User } = require("../model/user");

const { BlogInfo } = require("../model/admin");

// 查询
blog.get("/getBlogBySearch", async (req, res) => {
  let { title } = req.query;
  // let title = "小程序";
  let regSearch = new RegExp(title, "i");
  console.log(regSearch);
  let blogData = await BlogInfo.where("title", regSearch);
  res.send({
    status: 200,
    msg: "正则查询成功",
    data: blogData,
  });
});

// 获取博客数据
blog.get("/getBlogInfo", async (req, res) => {
  let data = await BlogInfo.find();
  let newBlogData = data.reverse();
  if (data.length) {
    res.send({
      status: 200,
      msg: "获取博客数据成功",
      data: newBlogData,
    });
    return;
  }
  res.send({
    status: 404,
    msg: "获取博客数据失败",
  });
});

// 博客详情页
blog.get("/getBlogInfoById", async (req, res) => {
  let id = req.query.id;
  let blogInfo = await BlogInfo.findOne({ _id: id });
  if (blogInfo) {
    res.send({
      status: 200,
      msg: "成功获取相应博客数据",
      data: {
        blogInfo,
      },
    });

    await BlogInfo.findByIdAndUpdate(
      { _id: id },
      {
        visits: blogInfo.visits + 1,
      }
    );
    return;
  }
  res.send({
    status: 404,
    msg: "获取相应数据失败，请输入正确的网址",
  });
});

blog.get("/getBlogInfoByTag", async (req, res) => {
  let tagName = req.query.tagName;
  let blogInfo = await BlogInfo.find().where("tags.tagName").equals(tagName);
  if (blogInfo) {
    res.send({
      status: 200,
      data: blogInfo,
      msg: "成功获取相关标签博客"
    })
  } else {
    res.send({
      status: 200,
      msg: "没有找到有关标签博客"
    })
  }
});

module.exports = blog;
