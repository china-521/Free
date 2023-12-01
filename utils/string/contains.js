import {
	isString
} from "../type/isString.js"
/**
 * 判断字符串是否包含另一字符串
 * @param {String} parent 主字符串
 * @param {String} sub 子字符串
 * @return {Boolean} 
 */
export function contains(parent, sub) {
	if (!parent || !sub) {
		return false;
	}
	if (!isString(parent, true, null, arguments) || !isString(sub, true, null, arguments)) {
		return;
	}
	if (parent.length < sub) {
		return false;
	}
	return parent.indexOf(sub) > -1;
}