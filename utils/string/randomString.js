import {
	isNumber
} from "../type/isNumber.js";

/**
 * 生成指定长度的随机字符串
 * @param {Number} length 生成的字符串长度
 * @return {String}
 */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_#*!&@';
export function randomString(length) {
	if(!length){
		return;
	}
	if (!isNumber(length, true, null, arguments)) {
		return;
	}
	let strLength = chars.length;
	let randomString = '';
	for (let i = 0; i < length; i++) {
		randomString += chars.charAt(Math.floor(Math.random() * strLength));
	}
	return randomString;
}