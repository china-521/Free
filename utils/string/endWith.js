import {
	isString
} from "../type/isString.js";

/**
 * 判断字符串是否是以指定的后缀结束
 * @param {String} str 字符串
 * @param {String} suffix 后缀
 * @return {Boolean}
 */
export function endWith(str, suffix) {
	if (!str || !suffix) {
		return false;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	return str.endsWith(suffix);
}