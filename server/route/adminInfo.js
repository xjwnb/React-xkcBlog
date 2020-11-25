const express = require("express");
const adminInfo = express.Router();

const { AdminInfo } = require("../model/adminInfo");

// 获取用户数据
adminInfo.get("/getAdminInfo", async (req, res) => {
  let adminInfo = await AdminInfo.findOne();
  if (adminInfo) {
    res.send({
      status: 200,
      msg: "获取管理员信息成功",
      data: adminInfo,
    });
  }
});

adminInfo.post("/postAdminInfo", async (req, res) => {
  let { name, codeAge, identity, technologyStack } = req.body;
  await AdminInfo.findOneAndUpdate(
    { id: 1 },
    {
      name,
      codeAge,
      identity,
      technologyStack,
    }
  );
  res.send({
    status: 200,
    msg: "修改成功",
  });
});

module.exports = adminInfo;
