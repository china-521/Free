import {
	equals
} from "../core/equals.js";
import {
	isArray
} from "../type/isArray.js";

/**
 * 返回子元素在数组中的位置，如果找不到，则返回 -1
 * @param {Array} arr 数组 
 * @param {any} item  数组子元素
 * @return {Number}
 */
export function index(arr, item) {
	arr = arr || [];

	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (!arr.length) {
		return -1;
	}
	for (let i = 0, len = arr.length; i < len; i++) {
		if (equals(arr[i], item)) {
			return i;
		}
	}
	return -1;
}