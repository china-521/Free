/**
 * 检查一个字符串是否是 rgb 颜色
 * @param {String} color 颜色字符串 
 * @return {Boolean}
 */
export function isRgbColor(color) {
	const reg = /\((.*?)\)$/;
	return /^rgb\((\d+|\d+\.\d+),(\d+|\d+\.\d+),(\d+|\d+\.\d+)\)$/.test(color) && color.match(reg)[1].split(',').every(function(item) {
		return parseFloat(item) >= 0 && parseFloat(item) <= 255;
	});
}