/**
 * 微信号正则
 * @param {String} value 微信号
 * @param {RegExp} reg 正则表达式
 * @returns {Boolean}
 */
export function wxReg(value, reg) {
	if (reg) {
		return reg.test(value.trim());
	}
	return /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(value.trim());
}