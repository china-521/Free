import {
	isArray
} from "../type/isArray.js";
import {
	equals
} from "../core/equals.js";
/**
 *  数组去重
 * @param {Array} arr 数组
 * @return {Array}
 */
export function distinct(arr) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	for (let i = 0, size = arr.length; i < size; i++) {
		for (let j = i + 1, len = arr.length; j < len; j++) {
			if (equals(arr[i], arr[j])) {
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr;
}