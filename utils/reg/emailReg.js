/**
 * 邮件正则
 * @param {String} value 邮箱号码
 * @param {RegExp} reg 正则表达式
 * @returns {Boolean}
 */
export function emailReg(value, reg) {
	if (reg) {
		return reg.test(value.trim());
	}
	return /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(value.trim());
}