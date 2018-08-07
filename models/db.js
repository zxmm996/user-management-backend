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
var db = mongoose.connection;
var User = require('./User.js');

exports.addUser = User.addUser;
exports.getUserList = User.getUserList;
exports.getUserInfoById = User.getUserInfoById;
exports.getUserInfoById = User.getUserInfoById;
exports.updateUser = User.updateUser;

