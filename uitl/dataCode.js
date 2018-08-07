// code 说明
// code 1 成功
// code 0 参数错误
// code -1 内部错误
exports.success = {
	code: 1,
	result: true,
}
exports.paramsError = {
	code: 0,
	result: '参数错误',
}
exports.error = {
	code: -1,
	result: '内部错误',
}