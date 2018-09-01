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
	//④ 用new关键字来实例化一个对象
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
	//⑤ 持久化，在数据库中保存
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
module.exports = User;


