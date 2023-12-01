import config from "../../config/config.js"

/**
 * 颜色名称转对应的16进制颜色
 * @param {String} color 颜色名称 
 * @returns 
 */
export function colorNameToHex(color) {
	const colorMap = config.colorMap();
	return colorMap[color];
}