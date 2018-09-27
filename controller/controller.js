var Formidable = require('formidable');
var jwt = require('jsonwebtoken');
var User = require('../models/User.js');
var Organization = require('../models/Organization.js');
var dataCode = require('../uitl/dataCode.js');

const {
	error,
	success,
	paramsError,
} = dataCode;

// 登录
exports.login = function(req, res, next) {
	const form = new Formidable.IncomingForm();
	form.parse(req, function(err, fields) {
		const userName = fields.userName;
		const password = fields.password;

		User.checkUser({
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
					req.session.user = result[0];
					res.status(200)
						 .send({
						...success,
						result: result[0],
						token: jwt.sign({ foo: 'bar' }, 'HelloKitty', { expiresIn: 60 * 60 }),
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
		const userNum = fields.userNum;
		const userName = fields.userName;
		const userGender = parseInt(fields.userGender, 10);
		const userBirthday = fields.userBirthday;
		const userPwd = fields.userPwd;
		const userOrgId = fields.userOrgId;
		const userPhoneNum = fields.userPhoneNum;

		User.addUser({
			userNum,
			userName,
			userGender,
			userBirthday,
			userPwd,
			userOrgId,
			userPhoneNum,
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

// 修改用户
exports.updateUser = function(req, res) {
	const form = new Formidable.IncomingForm();
	form.parse(req, function(err, fields) {
		const userId = fields.userId;
		const userNum = fields.userNum;
		const userName = fields.userName;
		const userGender = parseInt(fields.userGender, 10);
		const userBirthday = fields.userBirthday;
		const userPwd = fields.userPwd;
		const userOrgId = fields.userOrgId;
		const userPhoneNum = fields.userPhoneNum;

		User.updateUser({
			userId,
			userNum,
			userName,
			userGender,
			userBirthday,
			userPwd,
			userOrgId,
			userPhoneNum,
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

// 获取所有用户
exports.getUserList = function(req,res){
	User.getUserList(function(err, result) {
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
		orgId,
		page,
		pageSize,
	} = req.query;
	User.getUserListByPage({
		orgId,
		page: parseInt(page, 10),
		pageSize: parseInt(pageSize, 10),
	}, function(err, result, count) {
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
	User.getUserInfoById(userId, function(err, result) {
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
	User.deleteUser(userId, function(err, result) {
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

// 根据用户id批量删除用户
exports.deleteUsers = function(req,res){
	const userIds = req.query.userIds;
	User.deleteUsers(userIds.split(';'), function(err, result) {
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

		Organization.addOrganization({
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
	Organization.deleteOrganization(orgId, function(err, result) {
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
		Organization.updateOrganization({
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
	Organization.getOrgList(function(err, result) {
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
	Organization.getOrgTree(function(err, result) {
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
	Organization.getOrgInfoById(orgId, function(err, result) {
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