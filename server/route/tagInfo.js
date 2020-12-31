/*
 * @Author: your name
 * @Date: 2020-12-31 15:47:16
 * @LastEditTime: 2020-12-31 17:17:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\server\route\tagInfo.js
 */
const express = require("express");
const tagInfo = express.Router();

const { TagInfo } = require("../model/tagInfo");

// 获取标签信息
tagInfo.get("/getTagInfo", async (req, res) => {
  let tagInfo = await TagInfo.find();
  if (tagInfo) {
    res.send({
      status: 200,
      msg: "成功获取标签信息",
      data: tagInfo,
    });
  }
});

// 提交标签信息
tagInfo.post("/postTagInfo", async (req, res) => {
  let count = await TagInfo.countDocuments();
  let { tagName, tagColor } = req.body;
  TagInfo.create({
    id: count + 1,
    tagName,
    tagColor,
  }).then((response) => {
    console.log("插入标签成功");
    res.send({
      status: 200,
      msg: "插入标签成功",
    });
  });
});

// 删除标签
tagInfo.post("/deleteTagInfo", async (req, res) => {
  let tagName = req.body.tagName;
  await TagInfo.deleteOne({ tagName: tagName });
  let nowTagInfo = await TagInfo.findOne({ tagName: tagName });
  console.log(nowTagInfo);
  if (!nowTagInfo) {
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

module.exports = tagInfo;
