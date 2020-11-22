
const mongoose = require('mongoose')

const blogInfo = new mongoose.Schema({
  // 标题
  title: {
    type: String
  },
  // 作者
  author: {
    type: String
  },
  // 描述图片
  descriptionPicture: {
    type: String
  },
  // 时间
  time: {
    type: String
  },
  // 是否置顶
  isShowTop : {
    type: Boolean
  },
  // 访问量
  visits: {
    type: Number
  },
  // 内容
  content: {
    type: String
  }
})

let BlogInfo = mongoose.model('BlogInfo', blogInfo)

// 初始化首条博客数据
/* BlogInfo.create({
  title: '小卡车的第一篇博客',
  author: '小卡车',
  descriptionPicture: "",
  time: '2020-05-15 13:36:20',
  isShowTop: false,
  visits: 0,
  content: '<p>这是博客内容</p>'
}).then(res => {
  console.log('发表成功插入成功')
}).catch(err => {
  console.log('发表插入失败')
})
 */
module.exports = {
  BlogInfo
}