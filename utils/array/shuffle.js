import {
	isArray
} from "../type/isArray.js";

/**
 * 随机排列数组元素
 * @param {Array} arr 
 * @return {Array}
 */
export function shuffle(arr) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	let len = arr.length;
	while (len) {
		let randomIndex = Math.floor(Math.random() * len--);
		// 数值交换
		[arr[randomIndex], arr[len]] = [arr[len], arr[randomIndex]]; 
	}
	return arr;
}