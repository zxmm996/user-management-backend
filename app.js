var express = require("express");
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var FileStore = require('session-file-store')(session);

var app = express();
var router = require("./controller/controller.js");


app.use(cookieParser());
app.use(session({
	secret: 'HelloKitty',
	cookie: { maxAge: 1000 * 60 * 60 }, //设置maxAge,session和相应的cookie失效过期
	resave: true,
	saveUninitialized: true,
	// store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
}));

//罗列路由中间件
app.all('*', function(req, res, next) {
		// 设置允许跨域携带cookie
    res.header("Access-Control-Allow-Credentials", true);
    // 设置允许跨域携带cookie后
    // Access-Control-Allow-Origin不可以为 '*'，因为 '*' 会和 Access-Control-Allow-Credentials:true 冲突，需配置指定的地址
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post("/login", router.login);
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.status(200)
     .send('logout success');
})

app.all('*', function(req, res, next) {
   if (!req.session.user) {
   	res.status(401);
   	res.send('Forbidden');
   } else {
    next();
   }
});

app.post("/addUser", router.addUser);
app.get("/getUserList", router.getUserList);
app.get("/getUserListByPage", router.getUserListByPage);
app.get("/getUserInfoById", router.getUserInfoById);
app.get("/deleteUser", router.deleteUser);
app.get("/deleteUsers", router.deleteUsers);
app.post("/updateUser", router.updateUser);

app.post("/addOrganization", router.addOrganization);
app.get("/deleteOrganization", router.deleteOrganization);
app.post("/updateOrganization", router.updateOrganization);
app.get("/getOrgList", router.getOrgList);
app.get("/getOrgTree", router.getOrgTree);
app.get("/getOrgInfoById", router.getOrgInfoById);

app.listen(3000, '0.0.0.0');
console.log('server running on port 3000')