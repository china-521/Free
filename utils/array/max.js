import {
	isArray
} from "../type/isArray.js";

/**
 * 返回数组中的最大值
 * @param {Array<Number>} arr 数组 
 * @return {Number}
 */
export function max(arr) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (arr.length === 0) {
		return;
	} else {
		return Math.max(...arr);
	}
}