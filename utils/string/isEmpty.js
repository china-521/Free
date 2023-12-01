import {
	isString
} from '../type/isString.js';

/**
 * 判断是否是空字符串
 * @param {String} str 字符串 
 * @return {Boolean} 
 */
export function isEmpty(str) {
	if (!str) {
		return true;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	return str.length <= 0;
}