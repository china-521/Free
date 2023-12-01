import { isArray } from "../type/isArray.js";
/**
 * 筛选出 arr1 数组中所有不在 arr2 中的元素，并组成数组(不改变原数组)
 * @param {Array} arr1 目标数组
 * @param {Array} arr2 比对数组
 * @return {Array}
 */
export function difference(arr1, arr2) {
	arr1 = arr1 || [];
	arr2 = arr2 || [];
	if(!isArray(arr1,true,null,arguments)){
		return;
	}
	if(!isArray(arr2,true,null,arguments)){
		return;
	}
	// 判断参数
	if (arr1.length === 0) {
		return [];
	}
	if (arr2.length === 0) {
		return arr1.slice();
	}
	return arr1.filter(item => !arr2.includes(item));
}