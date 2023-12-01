/**
 * 将 rgb 颜色灰度化
 * @param {Number} r 
 * @param {Number} g 
 * @param {Number} b 
 */
export function gray(r, g, b) {
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}