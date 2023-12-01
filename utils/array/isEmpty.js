import {
	isArray
} from "../type/isArray.js";

/**
 * 判断数组是否为空
 * @param {Array} arr 数组 
 * @return {Boolean}
 */
export function isEmpty(arr) {
	if (!arr) {
		return true;
	}
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	return arr.length <= 0;
}