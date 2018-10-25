var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Organization = require("./Organization");

var userSchema = mongoose.Schema({
	userNum: String,
	userName: String,
	userGender: Number,
	userBirthday: String,
	userPwd: String,
	userOrgId: String,
	userPhoneNum: String,
	userOrgName: {
		type: String,
		ref: 'organization',
	},
});

// 静态方法，添加用户
userSchema.statics.addUser = function(payload, callback){
	var user = new User({
		userNum: payload.userNum,
		userName: payload.userName,
		userGender: payload.userGender,
		userBirthday: payload.userBirthday,
		userPwd: payload.userPwd,
		userOrgId: payload.userOrgId,
		userPhoneNum: payload.userPhoneNum,
		userOrgName: payload.userOrgId,
	});
	user.save(function(err,result){
		callback(err, result);
	});
}

// 根据userId 修改用户信息
userSchema.statics.updateUser = function(payload, callback) {
	User.update({ _id: payload.userId }, {
		userNum: payload.userNum,
		userName: payload.userName,
		userGender: payload.userGender,
		userBirthday: payload.userBirthday,
		userPwd: payload.userPwd,
		userOrgId: payload.userOrgId,
		userPhoneNum: payload.userPhoneNum,
		userOrgName: payload.userOrgId,
	}, callback);
}

// 获取用户列表
userSchema.statics.getUserList = function(callback) {
	User.find(null, callback);
}

// 分页获取用户数据
userSchema.statics.getUserListByPage = function(payload, callback) {
	const { orgId, page, pageSize } = payload;
	let conditions = null;
	if (orgId) {
		conditions = { userOrgId: orgId };
	}
	User.find(conditions, null, { skip: pageSize * (page - 1), limit: pageSize })
		.populate('userOrgName', 'orgName -_id')
		.exec(function(err, result) {
			if (!result) {
				callback(err,[],0);
				return;
			}
      	User.countDocuments(null, function(err, count) {
					if (err) {
						callback(err);
					} else {
						callback(err, result.map(doc => {
							const docObject = doc.toObject();
							return {
								...docObject,
								userOrgName: docObject.userOrgName.orgName,
							}
						}), count);
					}
				})
    });
}

// 根据用户id获取用户信息
userSchema.statics.getUserInfoById = function(userId, callback) {
	User.findOne({ _id: userId })
	.populate('userOrgName', 'orgName -_id')
	.exec(function(err, result) {
		const doc = result.toObject();
		callback(err, {
			...doc,
			userOrgName: doc.userOrgName.orgName,
		})
	});
}

// 删除用户
userSchema.statics.deleteUser = function(userId, callback) {
	User.deleteOne({ _id: userId }, callback);
}

// 批量删除用户
userSchema.statics.deleteUsers = function(userIds, callback) {
	User.remove({"_id": {$in: userIds}}, callback) 
}

// 用户登录校验
userSchema.statics.checkUser = function(payload, callback) {
	User.find({
		userNum: payload.userName,
		userPwd: payload.password,
	}, callback);
}

var User = mongoose.model('user', userSchema);
// 数据库初始化 添加管理员用户
User.find({
	userNum: 'admin',
}, function(err, result) {
	if (err) {
	} else {
		if (result.length === 0) {
			User.addUser({
				userNum: 'admin',
				userName: '管理员',
				userGender: '1',
				userBirthday: '1970-01-01',
				userPwd: 'admin',
				userOrgId: '',
				userPhoneNum: '',
				userOrgName: '',
			}, function(err, result) {

			})
		}
	}
})
module.exports = User;


