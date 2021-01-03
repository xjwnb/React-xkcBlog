const mongoose = require("mongoose");
const linksInfo = new mongoose.Schema({
  id: {
    type: Number,
    default: 1,
  },
  // 网址名称
  websiteName: {
    type: String,
  },
  // 网址
  website: {
    type: String,
  },
  // 头像名称
  authorImgUrl: {
    type: String,
  },
  // 描述
  describe: {
    type: String,
  },
  isPass: {
    type: Boolean,
    default: false
  }
});

const LinksInfo = mongoose.model("LinksInfo", linksInfo);

module.exports = {
  LinksInfo,
};