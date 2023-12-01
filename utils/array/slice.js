import {
	isArray
} from "../type/isArray.js"

/**
 *  数组切片：返回一个由 begin 和 end 决定的原数组的浅拷贝，原始数组不会被改变
 * @param {Array} arr 数组
 * @param {Number} begin 起始索引
 * @param {Number} end 终止索引 
 * @returns 
 */
export function slice(arr, begin, end) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	// 若arr数组长度为0
	if (arr.length === 0) {
		return [];
	}
	//判断 begin
	begin = begin || 0;

	if (begin >= arr.length) {
		return [];
	}
	// 判断end
	end = end || arr.length;
	if (end <= begin) {
		return [];
	}
	// 声明一个空数组
	const result = [];
	// 遍历数组
	for (let i = 0, len = arr.length; i < len; i++) {
		if (i >= begin && i < end) {
			// 将下标对应的元素压入数组
			result.push(arr[i]);
		}
	}
	return result;
}