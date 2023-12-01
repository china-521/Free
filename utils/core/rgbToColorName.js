import {
	hexToColorName
} from "./hexToColorName.js";
import {
	rgbToHex
} from "./rgbToHex.js";

/**
 * rgb 格式颜色转换为 颜色名称 
 * @param {String} color rgb 格式颜色
 * @return {String}
 */
export function rgbToColorName(color) {
	return hexToColorName(rgbToHex(color));
}