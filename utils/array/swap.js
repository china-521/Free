import {
	isArray
} from "../type/isArray.js"
import {
	isNumber
} from "../type/isNumber.js";

/**
 * 将指定数组中的 第i处元素和 第j处元素进行交换(交换数组中两个元素的位置)
 * @param {Array} arr 数组
 * @param {Number} index1 索引1
 * @param {Number} index2 索引2
 * @return {Array} 
 */
export function swap(arr, index1, index2) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if ((!index1 && index1 !== 0) || (!index2 && index2 !== 0)) {
		return arr;
	}
	if (!isNumber(index1, true, null, arguments) || !isNumber(index2, true, null, arguments)) {
		return;
	}
	if (arr.length === 0) {
		return [];
	}
	if (arr.length >= 2) {
		let temp = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = temp;
	}
	return arr;
}