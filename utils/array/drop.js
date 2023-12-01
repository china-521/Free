import { isArray } from "../type/isArray.js";
import { isNumber } from "../type/isNumber.js";

/**
 * 数组过滤,得到当前数组移除掉count个元素后剩下元素组成的数组,不改变原数组
 * @param {Array} arr 数组
 * @param {Number} count 移除数量
 * @param {Boolean} flag  false：从左开始移除 true：从右边开始移除，默认从左开始移除
 * @returns 
 */
export function drop(arr, count,flag) {
	arr = arr || [];
	count = count || 0;
	if(!isArray(arr,true,null,arguments)){
		return;
	}
	if(!isNumber(count,true,null,arguments)){
		return;
	}
	if (arr.length === 0) {
		return [];
	}
	if (flag) {
		return arr.filter((value, index) => index < arr.length - count);
	} else {
		return arr.filter((value, index) => index >= count);
	}
}