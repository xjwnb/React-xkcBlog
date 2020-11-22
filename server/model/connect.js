
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
  .then(res => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log('数据库连接失败')
  })
/* let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('mongodb 连接成功')
}) */
