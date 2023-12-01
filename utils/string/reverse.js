import {
	isString
} from "../type/isString.js";
/**
 * 字符串反转
 * @param {String} str 字符串 
 * @return {String}
 */
export function reverse(str) {
	if (!str) {
		return;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	return str.split('').reverse().join('');
}