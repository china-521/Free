/**
 * 检查一个字符串是否是 hsla 颜色
 * @param {String} color 颜色字符串 
 * @return {Boolean}
 */
export function isHslaColor(color) {
	const reg = /\((.*?)\)$/;
	return /^hsla\((\d+|\d+\.\d+),(\d+%|\d+\.\d+%),(\d+%|\d+\.\d+%),(\d+|\d+\.\d+)\)$/.test(color) &&
		color.match(reg)[1].split(',').every(function (item, index) {
			if(index === 0){
				return parseFloat(item) >= 0 && parseFloat(item) <= 360;
			}
			if(index === 1 || index === 2){
				return parseFloat(item) >= 0 && parseFloat(item) <= 100;
			}
			if(index === 3){
				return parseFloat(item) >= 0 && parseFloat(item) <= 1;
			}
		});
}