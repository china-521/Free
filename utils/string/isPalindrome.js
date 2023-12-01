import {
	isString
} from '../type/isString.js';
import {
	reverse
} from './reverse.js'

/**
 * 判断字符串是否是回文字符串
 * @param {String} str 字符串 
 * @return {Boolean}
 */
export function isPalindrome(str) {
	if (!str) {
		return false;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	return str === reverse(str);
}