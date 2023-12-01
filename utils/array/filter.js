import {
	isArray
} from "../type/isArray.js";
import {
	isFunction
} from "../type/isFunction.js";
/**
 * 按照给定的回调方法，对数组进行过滤，返回一个过滤后的新数组
 * @param {Array} arr 数组
 * @param {Function} callback 回调方法
 * @return {Array}
 */
export function filter(arr, callback) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (!callback) {
		return arr;
	}
	if (!isFunction(callback, true, null, arguments)) {
		return;
	}
	// 声明空数组
	let result = [];
	// 遍历数组
	for (let i = 0, len = arr.length; i < len; i++) {
		// 执行回调
		let res = callback(arr[i], i);
		// 判断 如果为 真 则压入到 result 结果中
		if (res) {
			result.push(arr[i]);
		}
	}
	return result;
}