/**
 * 强密码正则
 * @param {String} value 密码，必须包含大小写字母和数字的组合，可以使用特殊字符，长度在 8-10 之间
 * @param {RegExp} reg 正则表达式
 * @returns {Boolean}
 */
export function strongPassword2(value,reg){
	if (reg) {
		return reg.test(value.trim());
	}
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(value.trim());
}