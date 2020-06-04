const express = require("express");
const mongoose = require("mongoose");
const blog = express.Router();

const { User } = require("../model/user");

const { BlogInfo } = require("../model/admin");

blog.get('/getBlogInfo', async (req, res) => {
  let data = await BlogInfo.find()
  if (data.length) {
    res.send({
      status: 200,
      msg: '获取博客数据成功',
      data
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
  res.send({
    status: 200,
    msg: '成功获取相应博客数据',
    data: {
      blogInfo
    }
  })

})

module.exports = blog