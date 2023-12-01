import {
	isArray
} from "../type/isArray.js";

/**
 *  对数组元素进行反转
 * @param {Array<any>} arr 数组 
 * @return {Array}
 */
export function reverse(arr) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	return arr.reverse();
}