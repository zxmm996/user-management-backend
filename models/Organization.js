const mongoose = require('mongoose');

// 定义模型
var organizationSchema = mongoose.Schema({
	orgName: String,
	orgType: String,
	level: Number,
	pId: String,
	id: Number,
	children: Array,
})

// 添加机构
organizationSchema.statics.addOrganization = function(payload, callback) {
	const org = new Organization({
		...payload,
		children: [],
	});
	org.save(callback);
}

// 删除机构
organizationSchema.statics.deleteOrganization = function(orgId, callback) {
	Organization.find({ pId: orgId}, function(err, result) {
		if (err) {
			callback(err);
		} else {
			if (result.length > 0) {
				callback(err, 2);
			} else {
				Organization.deleteOne({'_id': orgId}, callback);
			}
		}
	})
}

// 修改机构
organizationSchema.statics.updateOrganization = function(payload, callback) {
	Organization.findByIdAndUpdate(payload.orgId, { $set: { orgName: payload.orgName }}, callback)
}

// 查询组织机构列表
organizationSchema.statics.getOrgList = function(callback) {
	Organization.find(null, callback);
}

// 查询组织机构树
organizationSchema.statics.getOrgTree = function(callback) {
	Organization.find(null, function(err, result) {
		if (err) {
			callback(err);
		} else {
			result.forEach((item, index, arr) => {
				const filter = result.filter(org => {
					return org.pId == item._id.toString();
				})
			result[index].children = filter;
		})

		callback(err, result.filter(item => item.level === 0));
		}
	});
}

// 根据机构id获取机构详情
organizationSchema.statics.getOrgInfoById = function(orgId, callback) {
	Organization.findOne({_id: orgId}, callback);
}

var Organization = mongoose.model('organization', organizationSchema);
module.exports = Organization;