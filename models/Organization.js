const mongoose = require('mongoose');

var Counter = mongoose.model('counter', counterSchema);
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
	Organization.deleteOne({'_id': orgId}, callback);
}

// 修改机构
organizationSchema.statics.updateOrganization = function(payload, callback) {
	Organization.update({'_id': payload.orgId}, payload, callback);
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

var Organization = mongoose.model('organization', organizationSchema);
module.exports = Organization;