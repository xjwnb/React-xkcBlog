const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('客户端成功访问')
  res.send('Hello My Blog')
})

app.listen(8888, () => {
  console.log('服务器启动成功')
})