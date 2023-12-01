import {
	isArray
} from "../type/isArray.js";

/**
 * 数组转字符串
 * @param {Array} arr 数组 
 * @param {String} separator 分隔符 
 * @returns 
 */
export function toString(arr, separator) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (arr.length === 0) {
		return;
	}
	separator = separator || '';
	return arr.join(separator);
}