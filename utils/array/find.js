import {
	isArray
} from "../type/isArray.js";
import {
	isFunction
} from "../type/isFunction.js";

/**
 * 找到第一个满足回调方法的元素并返回那个元素的值，如果找不到，则返回 undefined
 * @param {Array} arr  数组
 * @param {Function} callback 回调方法
 * @return {any}
 */
export function find(arr, callback) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (!callback) {
		return;
	}
	if (!isFunction(callback, true, null, arguments)) {
		return;
	}
	// 遍历数组
	for (let i = 0, len = arr.length; i < len; i++) {
		// 执行回调
		let res = callback(arr[i], i);
		// 判断
		if (res) {
			// 返回当前正在遍历的元素
			return arr[i];
		}
	}
	// 如果没有遇到满足条件的 返回 undefined
	return void 0;
}