import {
	isArray
} from "../type/isArray.js";

/**
 * 数组扁平化：取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
 * @param {Array} arr 数组
 * @return {Array} 
 */
export function flatten(arr) {
	if (!isArray(arr)) {
		return [];
	}
	// 声明空数组
	let result = [...arr];
	// 循环判断
	while (result.some(item => Array.isArray(item))) {
		result = [].concat(...result);
	}
	return result;
}