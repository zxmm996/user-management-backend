var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	userNum: String,
	userName: String,
	userGender: Number,
	userBirthday: String,
	userRealName: String,
	userPwd: String,
});


// 静态方法，添加用户
userSchema.statics.addUser = function(payload, callback){
	//④ 用new关键字来实例化一个对象
	var user = new User({
		userNum: payload.userNum,
		userName: payload.userName,
		userGender: payload.userGender,
		userBirthday: payload.userBirthday,
		userRealName: payload.userRealName,
		userPwd: payload.userPwd,
	});
	//⑤ 持久化，在数据库中保存
	user.save(function(err,result){
		callback(err, result);
	});
}

// 根据userId 修改用户信息
userSchema.statics.updateUser = function(payload, callback) {
	User.update({ _id: payload.userId }, payload, callback);
}

// 获取用户列表
userSchema.statics.getUserList = function(callback) {
	User.find(null, callback);
}

// 分页获取用户数据
userSchema.statics.getUserListByPage = function(payload, callback) {
	const { page, pageSize } = payload;
	User.find(null, null, { skip: pageSize * (page - 1), limit: pageSize }, function(err, result) {
		User.count(null, function(err, count) {
			if (err) {
				console.log('get count error');
			} else {
				callback(err, result, count);
			}
		})
	});
}
// 根据用户id获取用户信息
userSchema.statics.getUserInfoById = function(userId, callback) {
	User.find({ _id: userId }, callback);
}

// 删除用户
userSchema.statics.deleteUser = function(userId, callback) {
	User.deleteOne({ _id: userId }, callback);
}

// 用户登录校验
userSchema.statics.checkUser = function(payload, callback) {
	User.find({
		userName: payload.userName,
		userPwd: payload.password,
	}, callback);
}


var User = mongoose.model('user', userSchema);
module.exports = User;


