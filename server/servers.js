const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
// 连接数据库
require("./model/connect");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
app.use(
  session({
    secret: "session xkc",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600*1000*6 },
  })
);

const admin = require("./route/admin");

app.use("/admin", admin);
// require('./model/user')    只插入一个管理员用户即可

app.get("/", (req, res) => {
  console.log("客户端成功访问");
  res.send("Hello My Blog");
});

app.listen(8888, () => {
  console.log("服务器启动成功");
});
