var express = require("express");
var app = express();
var router = require("./controller/controller.js");


//罗列路由中间件
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post("/login", router.login);
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