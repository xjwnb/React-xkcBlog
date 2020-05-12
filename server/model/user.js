// 加载 mongoose 第三方模块
const mongoose = require('mongoose')
// 加载 bcryptjs 第三方密码加密模块
const bcrypt = require('bcryptjs')
// 创建用户集合规则
const user = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

let User = mongoose.model('User', user)

/* let salt = bcrypt.genSaltSync(10)
let hash = bcrypt.hashSync('171717ong', salt)

User.create({
  username: '小卡车',
  password: hash
}).then(res => {
  console.log('用户插入成功')
}).catch(err => {
  console.log('用户插入失败')
}) */

module.exports = {
  User
}
