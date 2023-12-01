
/**
 * 检查一个字符串是否是css的16进制颜色
 * @param {String} color 颜色字符串 
 * @return {Boolean}
 */
export function isHexColor(color) {
	return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color);
}

