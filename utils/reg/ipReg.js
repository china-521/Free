/**
 * 判断是否是一个ip地址
 * @param {String} value ip 地址
 * @param {RegExp} reg 正则表达式 
 * @return {Boolean}
 */
export function ipReg(value, reg) {
	if (reg) {
		return reg.test(value.trim());
	}
	return /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/.test(value);
}