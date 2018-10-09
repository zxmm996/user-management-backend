var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var config = require('../config.js');

mongoose.connect(config.db, {useNewUrlParser: true}, function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});

