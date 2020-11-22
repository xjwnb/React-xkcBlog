
const express = require("express");
const mongoose = require("mongoose");
const blog = express.Router();

const { User } = require("../model/user");

const { BlogInfo } = require("../model/admin");

// 获取博客数据
blog.get('/getBlogInfo', async (req, res) => {
  let data = await BlogInfo.find();
  let newBlogData = data.reverse();
  if (data.length) {
    res.send({
      status: 200,
      msg: '获取博客数据成功',
      data: newBlogData
    })
    return
  } 
  res.send({
    status: 404,
    msg: '获取博客数据失败'
  })
})

// 博客详情页
blog.get('/getBlogInfoById', async (req, res) => {
  let id = req.query.id
  let blogInfo = await BlogInfo.findOne({_id: id})
  if (blogInfo) {
    res.send({
      status: 200,
      msg: '成功获取相应博客数据',
      data: {
        blogInfo
      }
    })
    
    await BlogInfo.findByIdAndUpdate(
      { _id: id },
      {
        visits: blogInfo.visits + 1
      }
    )
    return ;
  }
  res.send({
    status: 404,
    msg: "获取相应数据失败，请输入正确的网址"
  })

})

module.exports = blog