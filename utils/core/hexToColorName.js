import config from "../../config/config.js";
/**
 *  16进制颜色转颜色名称 
 * @param {String} color 16进制颜色
 * @return {String}
 */
export function hexToColorName(color) {
	const colorMap = config.colorMap();
	for(let key in colorMap){
		if(colorMap[key] === color){
			return key;
		}
	}
}