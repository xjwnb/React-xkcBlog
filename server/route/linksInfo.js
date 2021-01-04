const express = require("express");
const linksInfo = express.Router();

const { LinksInfo } = require("../model/links");

// 获取友链信息
linksInfo.get("/getLinksInfo", async (req, res) => {
  let alllinksInfo = await LinksInfo.find();
  if (alllinksInfo) {
    res.send({
      status: 200,
      msg: "获取友链成功",
      data: alllinksInfo,
    });
  }
});

// 提交友链信息
linksInfo.post("/postLinksInfo", async (req, res) => {
  let { websiteName, website, authorImgUrl, describe } = req.body;
  let count = await LinksInfo.countDocuments();
  let lastLinkInfo = await LinksInfo.find()
    .limit(1)
    .skip(count ? count - 1 : 0);
  LinksInfo.create({
    id: lastLinkInfo[0] ? lastLinkInfo[0].id + 1 : 1,
    websiteName,
    website,
    authorImgUrl,
    describe,
  })
    .then((response) => {
      res.send({
        status: 200,
        msg: "链接插入成功",
      });
    })
    .catch((err) => {
      if (err) {
        res.send({
          status: 500,
          msg: "链接插入失败",
        });
      }
    });
});

// 修改是否通过（isPass）
linksInfo.post("/editIsPass", async (req, res) => {
  let id = req.body.id;
  let linksInfoById = await LinksInfo.findOne({ _id: id });
  await LinksInfo.findByIdAndUpdate(
    { _id: id },
    {
      isPass: !linksInfoById.isPass,
    }
  );
  res.send({
    status: 200,
    msg: "更新成功",
  });
});

// 删除友链信息
linksInfo.post("/deleteLinksInfo", async (req, res) => {
  let id = req.body.id;
  await LinksInfo.deleteOne({ _id: id });
  let nowLinksInfo = await LinksInfo.findOne({ _id: id });
  if (!nowLinksInfo) {
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

// 编辑友链信息
linksInfo.post("/editorLinksInfo", async (req, res) => {
  let { _id, website, describe, authorImgUrl, websiteName } = req.body;
  await LinksInfo.findByIdAndUpdate(
    { _id },
    {
      website,
      describe,
      authorImgUrl,
      websiteName,
    }
  );
  res.send({
    status: 200,
    msg: "编辑成功",
  });
});

// 获取以及通过的友链信息
linksInfo.get("/getAllPassLinksInfo", async (req, res) => {
  let passLinksInfo = await LinksInfo.find().where("isPass").equals(true);
  res.send({
    status: 200,
    msg: "获取通过的友链信息成功",
    data: passLinksInfo,
  });
});

module.exports = linksInfo;
