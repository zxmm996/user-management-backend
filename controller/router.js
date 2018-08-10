var db = require("../models/db.js");
var Formidable = require('formidable');
var dataCode = require('../uitl/dataCode.js');

const {
	error,
	success,
	paramsError,
} = dataCode;

exports.login = function(req, res) {
	const form = new Formidable.IncomingForm();
	form.parse(req, function(err, fields) {
		const userName = fields.userName;
		const password = fields.password;

		db.checkUser({
			userName,
			password,
		}, function(err, result) {
			if (err) {
				res.send(error);
			} else {
				if (result.length === 0) {
					res.send({
						...success,
						result: false,
					});
				} else {
					res.send({
						...success,
						result: result[0],
					})
				}
			}
		})
	})
}

// 增加用户
exports.addUser = function(req,res){
	//post参数 用formidable
	var form = new Formidable.IncomingForm();
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
				res.send(error);
			} else {
				res.send({
					...success,
					result: true,
				});
			}
		})
	})
}

exports.updateUser = function(req, res) {
	const form = new Formidable.IncomingForm();
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
				res.send(error)
			} else {
				res.send({
					...success,
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
			res.send(error);
		} else {
			res.send({
				...success,
				result,
				total: result.length,
			});
		}
	})
}

// 分页获取数据
exports.getUserListByPage = function(req, res) {
	const {
		page,
		pageSize,
	} = req.query;
	db.getUserListByPage({
		page: parseInt(page, 10),
		pageSize: parseInt(pageSize, 10),
	}, function(err, result, count) {
		console.log('count===', count);
		if (err) {
			res.send(error);
		} else {
			res.send({
				...success,
				result,
				total: count,
			})
		}
	})
}

// 根据用户id获取用户信息
exports.getUserInfoById = function(req,res){
	const userId = req.query.userId;
	db.getUserInfoById(userId, function(err, result) {
		if (err) {
			res.send(error);
		} else {
			res.send({
				...success,
				result,
			});
		}
	})
}

// 根据用户id删除用户
exports.deleteUser = function(req,res){
	const userId = req.query.userId;
	db.deleteUser(userId, function(err, result) {
		if (err) {
			res.send(error);
		} else {
			res.send({
				...success,
				result: true,
			});
		}
	})
}

// 添加组织机构
exports.addOrganization = function(req, res) {
	const form = new Formidable.IncomingForm();
	form.parse(req, function(err, fields) {
		const {
			orgName,
			orgType,
			level,
			pId,
		} = fields;

		db.addOrganization({
			orgName,
			orgType,
			level: parseInt(level, 10) + 1,
			pId,
		}, function(err, result) {
			if (err) {
				res.send(error);
			} else {
				res.send({
					...success,
					result,
				})
			}
		})
	})
}

// 删除组织机构
exports.deleteOrganization= function(req, res) {
	const orgId = req.query.orgId;
	db.deleteOrganization(orgId, function(err, result) {
		if (err) {
			res.send(error);
		} else if (result === 2){
				res.send({
				...success,
				result: false,
			})
		} else {
			res.send({
				...success,
				result: true,
			})
		}
	})
}

// 修改组织机构
exports.updateOrganization = function(req, res) {
	const form = new Formidable.IncomingForm();
	form.parse(req, function(err, fields) {
		const {
			orgId,
			orgName,
		} = fields;
		db.updateOrganization({
			orgId,
			orgName,
		}, function(err, result) {
			if (err) {
				res.send(error);
			} else {
				res.send({
					...success,
					result: true,
				})
			}
		})
	})
}

// 获取机构列表
exports.getOrgList = function(req, res) {
	db.getOrgList(function(err, result) {
		if (err) {
			res.send(error);
		} else {
			res.send({
				...success,
				result,
			})
		}
	})
}

// 获取机构树
exports.getOrgTree = function(req, res) {
	db.getOrgTree(function(err, result) {
		if (err) {
			res.send(error);
		} else {
			res.send({
				...success,
				result,
			})
		}
	})
}

// 根据机构id获取机构详情
exports.getOrgInfoById = function(req, res) {
	const orgId = req.query.orgId;
	db.getOrgInfoById(orgId, function(err, result) {
		if (err) {
			res.send(error);
		} else {
			res.send({
				...success,
				result,
			})
		}
	})
}