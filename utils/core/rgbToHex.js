import {
	isPlainObject
} from "../type/isPlainObject";
import {
	contains
} from "./contains";
import {
	isRgbColor
} from "../type/isRgbColor";
import {
	isString
} from "../type/isString.js";

/**
 * 将 rgb 转换为 16进制格式，默认返回的是 #000000
 * @param  {String/Object} rgb rgb 格式颜色
 * @return {String}
 */
export function rgbToHex(rgb) {

	if (!rgb) {
		return;
	}

	if (isRgbColor(rgb)) {
		const reg = /\((.*?)\)/;
		rgb = rgb.match(reg)[1].split(',');
	} else if (isString(rgb) && contains(rgb, ',')) {
		rgb = rgb.split(',');
	} else if (isPlainObject(rgb)) {
		rgb = [rgb.r, rgb.g, rgb.b];
	}

	let r = parseInt(rgb[0]) || 0;
	let g = parseInt(rgb[1]) || 0;
	let b = parseInt(rgb[2]) || 0;

	// 将RGB值转换为16进制
	let hexR = r.toString(16);
	let hexG = g.toString(16);
	let hexB = b.toString(16);

	// 补全16进制字符
	if (hexR.length === 1) {
		hexR = '0' + hexR;
	}
	if (hexG.length === 1) {
		hexG = '0' + hexG;
	}
	if (hexB.length === 1) {
		hexB = '0' + hexB;
	}

	// 组合为7位的16进制颜色代码
	let hex = '#' + hexR + hexG + hexB;
	return hex;
}