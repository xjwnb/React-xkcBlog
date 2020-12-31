
const mongoose = require("mongoose");
const tagInfo = new mongoose.Schema({
  id: {
    type: Number,
    default: 1,
  },
  tagName: {
    type: String,
  },
  tagColor: {
    type: String
  }
});



const TagInfo = mongoose.model("TagInfo", tagInfo);


/* TagInfo.create({
  tagName: "js",
  tagColor: "#2eb1dd"
}).then(res => {
  console.log("tagInfo 插入成功");
}).catch(err => {
  console.log("tagInfo 插入失败");
}) */

module.exports = {
  TagInfo,
};
