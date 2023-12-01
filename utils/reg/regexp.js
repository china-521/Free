/**
 * 用户自定义正则，并进行验证，如果合法返回true，否则返回 false
 * @param {RegExp} reg 正则表达式
 * @param {*} value  待验证数据
 */
export function regExp(reg, value) {
	return reg.test(value);
}