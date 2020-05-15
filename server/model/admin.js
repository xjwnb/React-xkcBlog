const mongoose = require('mongoose')

const blogInfo = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  time: {
    type: String
  },
  isShowTop : {
    type: Boolean
  },
  content: {
    type: String
  }
})

let BlogInfo = mongoose.model('BlogInfo', blogInfo)

/* BlogInfo.create({
  title: '小卡车的第一篇博客',
  author: '小卡车',
  time: '2020-05-15 13:36:20',
  isShowTop: false,
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