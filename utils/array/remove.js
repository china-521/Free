import {
	isArray
} from "../type/isArray.js";
import {
	index as findIndex
} from "./index.js"

/**
 * 删除数组中的指定元素，并返回一个被删除元素数组
 * @param {Array} arr 数组
 * @param  {...any} items 待移除元素
 * @return {Array<any>} 
 */
export function remove(arr, ...items) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (arr.length === 0) {
		return arr;
	}
	let result = [];

	for (let i = 0, len = items.length; i < len; i++) {
		const index = findIndex(arr, items[i]);
		if (index > -1) {
			result.push(...arr.splice(index, 1));
		}
	}
	return result;
}