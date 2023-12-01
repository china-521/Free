import {
	isString
} from "../type/isString";
import {
	exception
} from "../../exception/exception.js";

/**
 * 16进制颜色转RGB
 * @param {String} color 颜色字符串
 * @return {Object} 
 */
export function hexToRgb(color) {
	if (!color) {
		return;
	}
	if (!isString(color, true, null, arguments)) {
		return;
	}

	const reg = /^#/;

	if(!reg.test(color)){
		exception(color,null,'Invalid coloradecimal color code');
	}

	// 判断是否为简写格式
	if (color.length === 7) {
		let r = parseInt(color.slice(1, 3), 16);
		let g = parseInt(color.slice(3, 5), 16);
		let b = parseInt(color.slice(5, 7), 16);
		return {r,g,b};
	} else if (color.length === 4) {
		// 简写格式转换为全格式
		let r = parseInt(color[1] + color[1], 16);
		let g = parseInt(color[2] + color[2], 16);
		let b = parseInt(color[3] + color[3], 16);
		return {r,g,b};
	}
}