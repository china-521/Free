import {
	isString
} from "../type/isString.js";

/**
 * 移除字符串中的标签元素 
 * @param {String} str 字符串 
 * @return {String}
 */
export function removeTag(str) {
	if (!str) {
		return;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	return new DOMParser().parseFromString(str, 'text/html').body.textContent || '';
}