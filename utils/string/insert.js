import {
	isNumber
} from "../type/isNumber.js";
import {
	isString
} from "../type/isString.js";
import {
	stringify
} from "../core/stringify.js";
/**
 * 字符串中插入其他字符
 * @param {String} str 原始字符串
 * @param {Number} index 插入的位置索引
 * @param {String} newStr 新字符串
 * @return {String}
 */
export function insert(str, index, newStr) {
	if (!str) {
		return;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	index = index || 0;
	if (!isNumber(index, true, null, arguments)) {
		return;
	}
	if (!newStr) {
		return str;
	}
	return str.slice(0, index) + stringify(newStr) + str.slice(index);
}