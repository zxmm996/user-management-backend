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
		if(err){
			console.log("保存失败");
			return;
		}
		console.log("保存成功");
		callback(err, result);
	});
}

// 根据userId 修改用户信息
userSchema.statics.updateUser = function(payload, callback) {
	User.update({ _id: payload.userId }, payload, function(err, result) {
		callback(err, result)
	});
}

// 获取用户列表
userSchema.statics.getUserList = function(callback) {
	User.find(null, callback);
}

// 根据用户id获取用户信息
userSchema.statics.getUserInfoById = function(userId, callback) {
	User.find({ _id: userId }, function(err, result) {
		callback(err, result)
	});
}

// 删除用户
userSchema.statics.deleteUser = function(userId, callback) {
	User.deleteOne({ _id: userId }, callback);
}
userSchema.statics.checkUser = function(payload, callback) {
	User.find({
		userName: payload.userName,
		userPwd: payload.password,
	}, callback);
}


var User = mongoose.model('user', userSchema);
module.exports = User;


