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

userSchema.statics.updateUser = function(payload, callback) {
	User.update({ _id: payload.userId }, payload, function(err, result) {
		callback(err, result)
	});
}

userSchema.statics.getUserList = function(callback) {
	User.find(null, callback);
}
userSchema.statics.getUserInfoById = function(userId, callback) {
	User.find({ _id: userId }, function(err, result) {
		callback(err, result[0])
	});
}


var User = mongoose.model('user', userSchema);
module.exports = User;


