import {
	isArray
} from "../type/isArray.js";
import {
	isFunction
} from "../type/isFunction.js";

/**
 * 如果数组中的每个元素都满足回调方法，则返回 true，否则返回false
 * @param {Array} arr 数组 
 * @param {Function} callback 回调方法 
 * @return {Boolean}
 */
export function every(arr, callback) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (!callback) {
		return false;
	}
	if (!isFunction(callback, true, null, arguments)) {
		return;
	}
	// 遍历数组
	for (let i = 0, len = arr.length; i < len; i++) {
		// 执行回调,如果回调执行结果返回为 false
		if (!callback(arr[i], i)) {
			return false;
		}
	}
	return true;
}