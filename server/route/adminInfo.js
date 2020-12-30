const express = require("express");
const adminInfo = express.Router();

const { AdminInfo } = require("../model/adminInfo");

// 获取用户数据
adminInfo.get("/getAdminInfo", async (req, res) => {
  // let adminInfo = await AdminInfo.findOne();
  let count = await AdminInfo.countDocuments();
  let lastInfo = await AdminInfo.find()
    .skip(count - 1)
    .limit(1);
  // console.log(lastInfo);
  if (lastInfo) {
    res.send({
      status: 200,
      msg: "获取管理员信息成功",
      data: lastInfo[0],
    });
  }
});

adminInfo.post("/postAdminInfo", async (req, res) => {
  let {
    _id,
    name,
    avatar,
    codeAge,
    identity,
    technologyStack,
    qq,
    email,
    wx,
    github,
  } = req.body;
  await AdminInfo.findOneAndUpdate(
    { _id: _id },
    {
      name,
      avatar,
      codeAge,
      identity,
      technologyStack,
      qq,
      email,
      wx,
      github,
    }
  );
  res.send({
    status: 200,
    msg: "修改成功",
  });
});

module.exports = adminInfo;
