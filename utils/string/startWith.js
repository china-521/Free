import {
	isString
} from "../type/isString.js";

/**
 * 判断字符串是否是以指定的前缀结束
 * @param {String} str 字符串
 * @param {String} pre 前缀
 * @return {Boolean}
 */
export function startWith(str, pre) {
	if (!str || !pre) {
		return false;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	return str.startsWith(pre);
}