/**
 * 匹配方括号以及方括号中的内容 [...]
 * 
 * @param {String} value 待匹配字符
 * @param {RegExp} reg 正则表达式
 * @returns {Boolean}
 */
export function matchFk(value, reg) {
	if (reg) {
		return reg.test(value);
	}
	return /^\[.*?\]$/.test(value);
}