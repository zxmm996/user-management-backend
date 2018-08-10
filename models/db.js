var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
//数据库地址，斜杠后面是数据库名字
mongoose.connect('mongodb://localhost:27017/service', {useNewUrlParser: true}, function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
var User = require('./User.js');
var Organization = require('./Organization.js');

exports.addUser = User.addUser;
exports.getUserList = User.getUserList;
exports.getUserInfoById = User.getUserInfoById;
exports.getUserInfoById = User.getUserInfoById;
exports.updateUser = User.updateUser;
exports.deleteUser = User.deleteUser;
exports.checkUser = User.checkUser;
exports.getUserListByPage = User.getUserListByPage;
exports.addOrganization = Organization.addOrganization;
exports.deleteOrganization = Organization.deleteOrganization;
exports.updateOrganization = Organization.updateOrganization;
exports.getOrgList = Organization.getOrgList;
exports.getOrgTree = Organization.getOrgTree;
exports.getOrgInfoById = Organization.getOrgInfoById;

