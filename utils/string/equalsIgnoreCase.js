import {
	isString
} from "../type/isString.js";
/**
 * 比较两个字符串是否相等(忽略大小写)
 * @param {String} str1 字符串1 
 * @param {String} str2 字符串2
 * @return {Boolean}
 */
export function equalsIgnoreCase(str1, str2) {
	if (!str1 || !str2) {
		return false;
	}
	if (!isString(str1, true, null, arguments) || !isString(str2,true,null,arguments)) {
		return;
	}
	return str1.toLowerCase() === str2.toLowerCase();
}