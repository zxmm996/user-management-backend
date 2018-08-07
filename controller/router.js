var db = require("../models/db.js");
var formidable = require('formidable');
var dataCode = require('../uitl/dataCOde.js');

// 增加用户
exports.addUser = function(req,res){
	//post参数 用formidable
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields) {
		const userNm = fields.userNum;
		const userName = fields.userName;
		const userGender = parseInt(fields.userGender, 10);
		const userBirthday = fields.userBirthday;
		const userRealName = fields.userRealName;
		const userPwd = fields.userPwd;

		db.addUser({
			userNm : userNm,
			userName : userName,
			userGender : userGender,
			userBirthday : userBirthday,
			userRealName : userRealName,
			userPwd : userPwd,
		},function(err,result){
			if (err) {
				res.send(dataCode.error);
			} else {
				res.send(dataCode.success);
			}
		})
	})
}

exports.updateUser = function(req, res) {
	const form = new formidable.IncomingForm();
	form.parse(req, function(err, fields) {
		const userId = fields.userId;
		const userNum = fields.userNum;
		const userName = fields.userName;
		const userGender = parseInt(fields.userGender, 10);
		const userBirthday = fields.userBirthday;
		const userRealName = fields.userRealName;
		const userPwd = fields.userPwd;

		db.updateUser({
			userId,
			userNum,
			userName,
			userGender,
			userBirthday,
			userRealName,
			userPwd,
		}, function(err, result) {
			if (err) {
				res.send(dataCode.error)
			} else {
				res.send({
					...dataCode.success,
					result,
				})
			}
		})
	})
}

// 查询用户
exports.getUserList = function(req,res){
	db.getUserList(function(err, result) {
		if (err) {
			res.send(dataCode.error);
		} else {
			res.send({
				...dataCode.success,
				result,
			});
		}
	})
}

// 根据用户id获取用户信息
exports.getUserInfoById = function(req,res){
	const userId = req.query.userId;
	db.getUserInfoById(userId, function(err, result) {
		if (err) {
			res.send(dataCode.error);
		} else {
			res.send({
				...dataCode.success,
				result,
			});
		}
	})
}

