/**
 * 检查一个字符串是否是 rgba 颜色
 * @param {String} color 颜色字符串 
 * @return {Boolean}
 */
export function isRgbaColor(color) {
	const reg = /\((.*?)\)$/;
	return /^rgba\((\d+|\d+\.\d+),(\d+|\d+\.\d+),(\d+|\d+\.\d+),(\d+|\d+\.\d+)\)$/.test(color) &&
	 color.match(reg)[1].split(',').every(function(item,index) {
		return index >=3 ? parseFloat(item) >= 0 && parseFloat(item) <= 1 : parseFloat(item) >= 0 && parseFloat(item) <= 255;
	});
}
